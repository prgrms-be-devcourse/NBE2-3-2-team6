package com.redbox.domain.notice.service;

import com.redbox.domain.attach.entity.AttachFile;
import com.redbox.domain.attach.entity.Category;
import com.redbox.domain.attach.repository.AttachFileRepository;
import com.redbox.domain.notice.dto.CreateNoticeRequest;
import com.redbox.domain.notice.dto.NoticeListResponse;
import com.redbox.domain.notice.dto.NoticeResponse;
import com.redbox.domain.notice.dto.UpdateNoticeRequest;
import com.redbox.domain.notice.entity.Notice;
import com.redbox.domain.notice.exception.NoticeNotFoundException;
import com.redbox.domain.notice.repository.NoticeQueryRepository;
import com.redbox.domain.notice.repository.NoticeRepository;
import com.redbox.domain.user.repository.UserRepository;
import com.redbox.global.entity.PageResponse;
import com.redbox.global.infra.s3.S3Service;
import com.redbox.global.util.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final NoticeQueryRepository noticeQueryRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final AttachFileRepository attachFileRepository;

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
                // 로그인 구현 되면 추가
//                .user()
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
}
