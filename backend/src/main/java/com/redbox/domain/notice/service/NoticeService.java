package com.redbox.domain.notice.service;

import com.redbox.domain.attach.entity.AttachFile;
import com.redbox.domain.attach.entity.Category;
import com.redbox.domain.attach.repository.AttachFileRepository;
import com.redbox.domain.notice.dto.*;
import com.redbox.domain.notice.entity.Notice;
import com.redbox.domain.notice.exception.NoticeNotFoundException;
import com.redbox.domain.notice.repository.NoticeQueryRepository;
import com.redbox.domain.notice.repository.NoticeRepository;
import com.redbox.domain.user.repository.UserRepository;
import com.redbox.domain.user.service.UserService;
import com.redbox.global.entity.PageResponse;
import com.redbox.global.infra.s3.S3Service;
import com.redbox.global.util.FileUtils;
import io.lettuce.core.RedisConnectionException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final NoticeQueryRepository noticeQueryRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final AttachFileRepository attachFileRepository;
    private final UserService userService;
    private final RedisTemplate<String, Object> redisTemplate;
    private static final String TOP5_NOTICES_KEY = "notices:top5";

    // 서버 시작시 캐시 초기화
    @PostConstruct
    public void initializeCache() {
        updateTop5NoticesCache();
    }

    // 00시마다 캐시 갱신
//    @Scheduled(cron = "0 0 0 * * *")
    public void scheduleUpdateCache() {
        updateTop5NoticesCache();
    }

    // Redis에서 캐시된 데이터 조회
    public List<RecentNoticeResponse> getCachedTop5Notices() {
        try {
            Object cachedObject = redisTemplate.opsForValue().get(TOP5_NOTICES_KEY);
            List<RecentNoticeResponse> cachedNotices = cachedObject != null
                    ? (List<RecentNoticeResponse>) cachedObject
                    : null;

            if (cachedNotices == null) {
                return updateTop5NoticesCache();
            }
            return cachedNotices;
        } catch (RedisConnectionException e) {
            log.error("Redis 연결 실패, DB에서 직접 조회합니다", e);
            return getTop5NoticesFromDB();
        }
    }

    // 캐시 갱신 로직
    private List<RecentNoticeResponse> updateTop5NoticesCache() {
        List<RecentNoticeResponse> top5Notices = getTop5NoticesFromDB();
        try {
            redisTemplate.opsForValue().set(TOP5_NOTICES_KEY, top5Notices, Duration.ofDays(1));
        } catch (RedisConnectionException e) {
            log.error("Redis 캐시 갱신 실패", e);
        }
        return top5Notices;
    }

    // 새 공지사항 등록 시 캐시 갱신
    public void createNotice(Notice notice) {
        noticeRepository.save(notice);
        updateTop5NoticesCache();
    }

    public PageResponse<NoticeListResponse> getNotices(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return new PageResponse<>(noticeQueryRepository.findNotices(pageable));
    }

    @Transactional
    public NoticeResponse getNotice(Long noticeId) {
        // 조회수 증가
        noticeRepository.increaseHit(noticeId);

        // 공지사항 조회
        Notice notice = noticeRepository.findForDetail(noticeId)
                .orElseThrow(NoticeNotFoundException::new);

        return new NoticeResponse(notice);
    }

    @Transactional
    public NoticeResponse createNotice(CreateNoticeRequest request, List<MultipartFile> files) {
        Notice notice = Notice.builder()
                .user(userService.getCurrentUser())
                .noticeTitle(request.getTitle())
                .noticeContent(request.getContent())
                .build();

        noticeRepository.save(notice);

        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                // S3에 파일 업로드
                String newFilename = FileUtils.generateNewFilename();
                String extension = FileUtils.getExtension(file);
                String fullFilename = newFilename + "." + extension;
                s3Service.uploadFile(file, Category.NOTICE, notice.getId(), fullFilename);

                // 파일 데이터 저장
                AttachFile attachFile = AttachFile.builder()
                        .category(Category.NOTICE)
                        .notice(notice)
                        .originalFilename(file.getOriginalFilename())
                        .newFilename(fullFilename)
                        .build();

                notice.addAttachFiles(attachFile);
            }
        }

        return new NoticeResponse(notice);
    }

    @Transactional
    public NoticeResponse updateNotice(Long noticeId, UpdateNoticeRequest request) {
        Notice notice = noticeRepository.findForUpdate(noticeId)
                .orElseThrow(NoticeNotFoundException::new);
        notice.updateNotice(request);

        return new NoticeResponse(notice);
    }

    @Transactional
    public void deleteNotice(Long noticeId) {
        Notice notice = noticeRepository.findForDelete(noticeId)
                .orElseThrow(NoticeNotFoundException::new);

        // 파일 삭제
        for (AttachFile attachFile : notice.getAttachFiles()) {
            s3Service.deleteFile(attachFile.getCategory(), notice.getId(), attachFile.getNewFilename());
        }

        noticeRepository.delete(notice);
    }

    // 최신순 공지사항 5개 조회
    // DB에서 직접 조회
    public List<RecentNoticeResponse> getTop5NoticesFromDB() {
        return noticeRepository.findTop5ByOrderByCreatedAtDesc().stream()
                .map(notice -> new RecentNoticeResponse(
                        notice.getId(),
                        notice.getNoticeTitle(),
                        notice.getCreatedAt().toLocalDate()
                ))
                .toList();
    }
}
