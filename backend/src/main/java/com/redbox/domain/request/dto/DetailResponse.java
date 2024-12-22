package com.redbox.domain.request.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DetailResponse {
    private Long id; // 게시글 ID
    private String title; // 제목
    private int views; // 조회수
    private LocalDate start_date; // 기부 시작일
    private LocalDate end_date; // 기부 종료일
    private int target_amount; // 목표 수량
    private int current_amount; // 현재 모금된 수량
    private int likes; // 좋아요 수
    private String status; // 상태
    private String content; // 내용
    private boolean isLiked; // 좋아요 여부
    private List<AttachmentResponse> attachments; // 첨부 파일 리스트

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AttachmentResponse {
        private String name; // 파일 이름
        private int downloads; // 다운로드 수
        private String downloadUrl; // 파일 다운로드 URL
    }
}
