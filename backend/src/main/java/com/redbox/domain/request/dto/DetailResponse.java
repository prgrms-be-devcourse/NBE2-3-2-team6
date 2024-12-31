package com.redbox.domain.request.dto;

import com.redbox.domain.request.entity.Request;
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
    private String userEmail; // 작성자
    private LocalDate date; // 등록일
    private String title; // 제목
    private int views; // 조회수
    private LocalDate startDate; // 기부 시작일
    private LocalDate endDate; // 기부 종료일
    private int targetAmount; // 목표 수량
    private int currentAmount; // 현재 모금된 수량

    private int likes; // 좋아요 수
    private String status; // 상태
    private String content; // 내용
    private boolean isLiked; // 좋아요 여부

    // todo : 파일 로직 처리 수정
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

    public DetailResponse(Request request, Boolean isLiked, List<AttachmentResponse> attachments) {
        this.id = request.getRequestId();
        this.userEmail = request.getCreatedBy();
        this.date = request.getCreatedAt();
        this.title = request.getRequestTitle();
        this.views = request.getRequestHits();
        this.startDate = request.getDonationStartDate();
        this.endDate = request.getDonationEndDate();
        this.targetAmount = request.getTargetAmount();
        this.currentAmount = request.getCurrentAmount();
        this.likes = request.getRequestLikes();
        this.status = request.getProgress().getText();
        this.content = request.getRequestContent();
        this.isLiked = isLiked;
        this.attachments = attachments;
    }
}