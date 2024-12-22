package com.redbox.domain.request.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BoardWriteRequest {

    @NotBlank(message = "제목을 입력해주세요")
    private String request_title; // 게시글 제목

    @NotBlank(message = "내용을 입력해주세요")
    private String request_content; // 게시글 내용

    @NotNull(message = "필요한 헌혈증 개수를 입력해주세요")
    private Integer target_amount; // 목표 개수

    @NotBlank(message = "시작 일자를 입력해주세요")
    private LocalDate donation_start_date; // 기부 시작 일자

    @NotBlank(message = "종료 일자를 입력해주세요")
    private LocalDate donation_end_date; // 기부 종료 일자

    // 파일 정보는 controller 로직에 포함
    // DTO 와 파일 처리 로직은 독립적이다
}
