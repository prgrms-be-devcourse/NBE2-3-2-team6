package com.redbox.domain.request.dto;

import com.redbox.domain.request.entity.Request;
import com.redbox.domain.request.entity.Status;

import lombok.Getter;

@Getter
public class ListResponse {

    // 임시용 DTO
    //TODO: 게시판 상세 페이지 확인하고 양식에 맞게 수정예정.
    private Long requestId; // 게시글 아이디

    private Long userId;

    private String requestTitle;
    private String requestContent;
    private int targetAmount;
    private int currentAmount;

    private Status status;

    private int requestHits;
    private int requestLikes;

    // Request 엔티티를 매개변수로 받는 생성자 추가
    public ListResponse(Request request) {
        this.requestId = request.getRequestId();
        this.userId = request.getUserId();
        this.requestTitle = request.getRequestTitle();
        this.requestContent = request.getRequestContent();
        this.targetAmount = request.getTargetAmount();
        this.currentAmount = request.getCurrentAmount();
        this.status = request.getStatus();
        this.requestHits = request.getRequestHits();
        this.requestLikes = request.getRequestLikes();
    }

}
