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
@RequestMapping("/community/request")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    // 게시글 등록
    @PostMapping("/write")
    public ResponseEntity<String> requestWrite(
            @RequestPart("post") @Valid WriteRequest writeRequest,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            requestService.saveRequest(writeRequest, file);
            return ResponseEntity.status(HttpStatus.OK).body("게시글이 성공적으로 등록되었습니다");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 등록 중 오류가 발생했습니다");
        }
    }

    // 요청 게시글 조회
    @GetMapping
    public ResponseEntity<PageResponse<RequestResponse>> getRequests(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @ModelAttribute RequestFilter request
            ) {

        PageResponse<RequestResponse> response = requestService.getRequests(page, size, request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 요청 게시글 상세 조회
    @GetMapping("/{requestId}")
    public ResponseEntity<DetailResponse> requestDetail(@PathVariable Long requestId) {
        return handleDetailRequest(requestId, true);
    }

    // todo : 파일 다운로드 처리
    /// url 로 get 받으면 다운 받을 수 있도록 (download url 확인하기)

    // todo : 기부 API URL 처리
    /// 기부 정보 전송( 수량, id, comment )

    // todo : (사용자 추가) like 에 대한 요청 처리 (사용자 id 필요)
    @PostMapping("/{requestId}/like")
    public ResponseEntity<LikeResponse> requestLike(@PathVariable Long requestId) {
        try {
            // 업데이트 로직
            requestService.likeRequest(requestId);
            LikeResponse likeResponse = new LikeResponse("처리되었습니다");
            return ResponseEntity.status(HttpStatus.OK).body(likeResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new LikeResponse());
        }
    }

    // 내용 불러오기
    @GetMapping("/modify/{requestId}")
    public ResponseEntity<DetailResponse> requestModify(@PathVariable Long requestId) {
        return handleDetailRequest(requestId, false);
    }

    // 내용 수정
    @PutMapping("/modify/{requestId}")
    public ResponseEntity<String> requestModify(
            @PathVariable Long requestId,
            @RequestPart("post") @Valid WriteRequest writeRequest,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            requestService.modifyRequest(requestId, writeRequest, file);
            return ResponseEntity.status(HttpStatus.OK).body("게시글이 성공적으로 등록되었습니다");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 등록 중 오류가 발생했습니다");
        }
    }

    // 요청 게시글 상세 조회 및 수정 공통 처리 메서드
    private ResponseEntity<DetailResponse> handleDetailRequest(Long requestId, boolean incrementHits) {
        try {
            DetailResponse detailResponse = requestService.getRequestDetails(requestId, incrementHits);
            return ResponseEntity.ok(detailResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}