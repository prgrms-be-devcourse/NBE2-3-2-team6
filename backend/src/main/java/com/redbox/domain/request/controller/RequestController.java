package com.redbox.domain.request.controller;

import com.redbox.domain.request.dto.*;
import com.redbox.domain.request.application.RequestService;
import com.redbox.global.entity.PageResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    // 게시글 등록 (조회수 증가 X)
    @PostMapping("/requests")
    public ResponseEntity<DetailResponse> requestWrite(
            @RequestPart("post") @Valid WriteRequest writeRequest,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        DetailResponse detailResponse = requestService.createRequest(writeRequest, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(detailResponse);
    }

    // 요청 게시글 목록 조회
    @GetMapping("/requests")
    public ResponseEntity<PageResponse<ListResponse>> getRequests(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @ModelAttribute RequestFilter request
            ) {
        PageResponse<ListResponse> response = requestService.getRequests(page, size, request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 요청 게시글 상세 조회 (조회수 증가 O)
    @GetMapping("/requests/{requestId}")
    public ResponseEntity<DetailResponse> viewRequestDetail(@PathVariable Long requestId) {
        DetailResponse detailResponse = requestService.viewRequest(requestId);
        return ResponseEntity.ok(detailResponse);
    }

    // 좋아요 처리 로직
    @PostMapping("/requests/{requestId}/like")
    public ResponseEntity<LikeResponse> requestLike(@PathVariable Long requestId) {
        requestService.likeRequest(requestId);
        LikeResponse likeResponse = new LikeResponse("처리되었습니다");
        return ResponseEntity.status(HttpStatus.OK).body(likeResponse);
    }

    // 내용 수정 (조회수 증가 X)
    @PutMapping("/requests/{requestId}")
    public ResponseEntity<DetailResponse> requestModify(
            @PathVariable Long requestId,
            @RequestPart("post") @Valid WriteRequest writeRequest,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        DetailResponse detailResponse = requestService.modifyRequest(requestId, writeRequest, file);
        return ResponseEntity.ok(detailResponse);
    }

    // 수정한 내용 불러오기 (조회수 증가 X)
    @GetMapping("/requests/modify/{requestId}")
    public ResponseEntity<DetailResponse> requestModify(@PathVariable Long requestId) {
        requestService.modifyAuthorize(requestId);
        DetailResponse detailResponse = requestService.getRequestDetail(requestId);
        return ResponseEntity.ok(detailResponse);
    }
}