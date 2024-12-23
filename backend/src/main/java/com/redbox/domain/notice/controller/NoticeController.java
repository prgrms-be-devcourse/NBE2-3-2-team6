package com.redbox.domain.notice.controller;

import com.redbox.domain.notice.dto.CreateNoticeRequest;
import com.redbox.domain.notice.dto.NoticeListResponse;
import com.redbox.domain.notice.dto.NoticeResponse;
import com.redbox.domain.notice.service.NoticeService;
import com.redbox.global.entity.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

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

    @GetMapping("/notices/{noticeId}")
    public ResponseEntity<NoticeResponse> getNotice(@PathVariable Long noticeId) {
        return ResponseEntity.ok(noticeService.getNotice(noticeId));
    }

    @PostMapping(value = "/notices", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<NoticeResponse> createNotice(
            @RequestPart(value = "request") @Valid CreateNoticeRequest request,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) {
        NoticeResponse response = noticeService.createNotice(request, files);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.getNoticeNo())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(response);
    }
}
