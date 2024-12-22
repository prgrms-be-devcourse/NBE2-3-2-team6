package com.redbox.domain.request.controller;

import com.redbox.domain.request.dto.*;
import com.redbox.domain.request.service.BoardDetailService;
import com.redbox.domain.request.service.BoardModifyService;
import com.redbox.domain.request.service.BoardWriteService;
import com.redbox.global.entity.PageResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardWriteService boardWriteService;
    private final BoardDetailService boardDetailService;
    private final BoardModifyService boardModifyService;

    @Value("${spring.file.upload-dir}") // 설정에서 업로드 디렉토리 가져오기
    private String uploadDir;

    // 게시글 등록
    @PostMapping("/community/request/write")
    public ResponseEntity<String> requestWrite(
            @RequestPart("post") BoardWriteRequest boardWriteRequest,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            boardWriteService.saveBoard(boardWriteRequest, file);
            return ResponseEntity.status(HttpStatus.OK).body("게시글이 성공적으로 등록되었습니다");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 등록 중 오류가 발생했습니다");
        }
    }

    // 요청 게시글 조회
    @GetMapping("/community/request")
    public ResponseEntity<PageResponse<BoardResponse>> getRequests(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @ModelAttribute RequestFilter request
            ) {
        System.out.println("#####");
        PageResponse<BoardResponse> response = boardWriteService.getRequests(page, size, request);
        System.out.println("222222222");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 요청 게시글 상세 조회
    @GetMapping("/community/request/{request_id}")
    public ResponseEntity<BoardDetailResponse> requestDetail(
            @PathVariable Long request_id
    ){
        System.out.println("@@@@@@@@@@@ 컨트롤러 호출 @@@@@@@@@@");
        try {
            BoardDetailResponse boardDetailResponse = boardDetailService.getBoardDetail(request_id);
            return ResponseEntity.status(HttpStatus.OK).body(boardDetailResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /// todo : 파일 다운로드 처리
    /// url 로 get 받으면 다운 받을 수 있도록 (download url 확인하기)

    /// todo : 기부 API URL 처리
    /// 기부 정보 전송( 수량, id, comment )

    /// todo : like 에 대한 요청 처리 ( 요청 오면 ok 는 날릴 수 있는데 )
    /// like 를 가지고 있는 테이블 존재 ( 사용자 ID, 게시글 ID, 좋아요 여부 )

    // 요청 게시글 수정

    // 내용 불러오기
    @GetMapping("/community/request/modify/{request_id}")
    public ResponseEntity<BoardDetailResponse> requestModify(
            @PathVariable Long request_id
    ){
        try {
            BoardDetailResponse boardDetailResponse = boardDetailService.getBoardDetail(request_id);
            return ResponseEntity.status(HttpStatus.OK).body(boardDetailResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 내용 수정
    @PutMapping("/community/request/modify/{request_id}")
    public ResponseEntity<String> requestModify(
            @PathVariable Long request_id,
            @RequestPart("post") BoardWriteRequest boardWriteRequest,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            boardModifyService.modifyBoard(request_id, boardWriteRequest, file);
            return ResponseEntity.status(HttpStatus.OK).body("게시글이 성공적으로 등록되었습니다");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 등록 중 오류가 발생했습니다");
        }
    }
}