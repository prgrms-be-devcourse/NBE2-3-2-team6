package com.redbox.domain.request.controller;

import com.redbox.domain.request.dto.BoardWriteRequest;
import com.redbox.domain.request.dto.BoardWriteResponse;
import com.redbox.domain.request.service.BoardWriteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardWriteService boardWriteService;

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
}