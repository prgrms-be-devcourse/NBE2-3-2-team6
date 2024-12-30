package com.redbox.domain.admin.dto;

import com.redbox.domain.request.entity.RequestStatus;
import com.redbox.domain.user.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDetailResponse {
    private Long id;
    private String title; // 제목
    private String author; // 작성자
    private LocalDate date; // 등록일
    private LocalDate startDate; // 기부 시작일
    private LocalDate endDate; // 기부 종료일
    private int targetAmount; // 목표 수량
    private String status;
    private int views; // 조회수
    private String content; // 내용

    // todo : 파일 로직 처리 (사용자 요청 게시글 한 후, 수정 필요)

}