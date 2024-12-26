package com.redbox.domain.request.controller;

import com.redbox.domain.request.dto.*;
import com.redbox.domain.request.service.RequestService;
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

    // 게시글 등록
    @PostMapping("/requests")
    public ResponseEntity<DetailResponse> requestWrite(
            @RequestPart("post") @Valid WriteRequest writeRequest,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        Long requestId = requestService.createRequest(writeRequest, file);
        DetailResponse detailResponse = requestService.getRequestDetails(requestId, false);
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

    // 요청 게시글 상세 조회
    @GetMapping("/requests/{requestId}")
    public ResponseEntity<DetailResponse> requestDetail(@PathVariable Long requestId) {
        System.out.println("@@@@@ 요청 게시글 상세 조회 @@@@@");
        return handleDetailRequest(requestId, true);
    }

    // todo : 파일 다운로드 처리
    // url 로 get 받으면 다운 받을 수 있도록 (download url 확인하기)
    // 파일 로직 처리 추가시, detailResponse 도 다시 작성

    // todo : 기부 API URL 처리
    // 기부 정보 전송( 수량, id, comment )

    // todo : (사용자 추가) like 에 대한 요청 처리 (사용자 id 필요)
    @PostMapping("/requests/{requestId}")
    public ResponseEntity<LikeResponse> requestLike(@PathVariable Long requestId) {
        requestService.likeRequest(requestId);
        LikeResponse likeResponse = new LikeResponse("처리되었습니다");
        return ResponseEntity.status(HttpStatus.OK).body(likeResponse);
    }

    // 내용 불러오기
    @GetMapping("/requests/modify/{requestId}")
    public ResponseEntity<DetailResponse> requestModify(@PathVariable Long requestId) {
        return handleDetailRequest(requestId, false);
    }

    // 내용 수정
    @PutMapping("/requests/{requestId}")
    public ResponseEntity<DetailResponse> requestModify(
            @PathVariable Long requestId,
            @RequestPart("post") @Valid WriteRequest writeRequest,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        // todo : 게시글 작성한 사용자만 수정가능
        Long requestModifyId = requestService.modifyRequest(requestId, writeRequest, file);
        return handleDetailRequest(requestModifyId, true);
    }

    // 요청 게시글 상세 조회 및 수정 공통 처리 메서드
    private ResponseEntity<DetailResponse> handleDetailRequest(Long requestId, boolean isIncrement) {
        DetailResponse detailResponse = requestService.getRequestDetails(requestId, isIncrement);
        return ResponseEntity.ok(detailResponse);
    }
}