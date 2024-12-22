package com.redbox.domain.notice.service;

import com.redbox.domain.notice.dto.NoticeListResponse;
import com.redbox.domain.notice.dto.NoticeResponse;
import com.redbox.domain.notice.entity.Notice;
import com.redbox.domain.notice.exception.NoticeNotFoundException;
import com.redbox.domain.notice.repository.NoticeQueryRepository;
import com.redbox.domain.notice.repository.NoticeRepository;
import com.redbox.domain.user.repository.UserRepository;
import com.redbox.global.entity.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final NoticeQueryRepository noticeQueryRepository;
    private final UserRepository userRepository;

    public PageResponse<NoticeListResponse> getNotices(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return new PageResponse<>(noticeQueryRepository.findNotices(pageable));
    }

    @Transactional
    public NoticeResponse getNotice(Long noticeId) {
        // 조회수 증가
        noticeRepository.increaseHit(noticeId);

        // 공지사항 조회
        Notice notice = noticeRepository.findWithAttachFilesById(noticeId)
                .orElseThrow(NoticeNotFoundException::new);

        // 글쓴이 조회
        String writer = userRepository.findNameById(notice.getUserId())
                .orElse("Unknown");

        return new NoticeResponse(notice, writer);
    }
}
