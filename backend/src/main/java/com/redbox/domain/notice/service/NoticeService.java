package com.redbox.domain.notice.service;

import com.redbox.domain.notice.dto.NoticeListResponse;
import com.redbox.domain.notice.repository.NoticeQueryRepository;
import com.redbox.domain.notice.repository.NoticeRepository;
import com.redbox.global.entity.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final NoticeQueryRepository noticeQueryRepository;

    public PageResponse<NoticeListResponse> getNotices(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return new PageResponse<>(noticeQueryRepository.findNotices(pageable));
    }
}
