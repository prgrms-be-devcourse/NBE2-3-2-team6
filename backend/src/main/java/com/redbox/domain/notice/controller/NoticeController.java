package com.redbox.domain.notice.controller;

import com.redbox.domain.notice.dto.NoticeListResponse;
import com.redbox.domain.notice.service.NoticeService;
import com.redbox.global.entity.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping("/notices")
    public ResponseEntity<PageResponse<NoticeListResponse>> getNotices(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(noticeService.getNotices(page, size));
    }
}
