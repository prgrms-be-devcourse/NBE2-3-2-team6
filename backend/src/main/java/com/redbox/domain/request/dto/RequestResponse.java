package com.redbox.domain.request.dto;

import com.redbox.domain.request.entity.Request;
import com.redbox.domain.request.entity.Status;

import lombok.Getter;

@Getter
public class RequestResponse {

    // 임시용 DTO
    //TODO: 게시판 상세 페이지 확인하고 양식에 맞게 수정예정.
    private Long request_id; // 게시글 아이디

    private Long user_id;

    private String request_title;
    private String request_content;
    private int target_amount;
    private int current_amount;

    private Status status;

    private int request_hits;
    private int request_likes;

    // Request 엔티티를 매개변수로 받는 생성자 추가
    public RequestResponse(Request request) {
        this.request_id = request.getRequestId();
        this.user_id = request.getUserId();
        this.request_title = request.getRequestTitle();
        this.request_content = request.getRequestContent();
        this.target_amount = request.getTargetAmount();
        this.current_amount = request.getCurrentAmount();
        this.status = request.getStatus();
        this.request_hits = request.getRequestHits();
        this.request_likes = request.getRequestLikes();
    }

}
