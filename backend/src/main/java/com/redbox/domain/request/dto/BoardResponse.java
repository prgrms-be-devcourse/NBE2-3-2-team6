package com.redbox.domain.request.dto;

import com.redbox.domain.request.entity.Board;
import com.redbox.domain.request.entity.Priority;
import com.redbox.domain.request.entity.Status;

import lombok.Getter;

@Getter
public class BoardResponse {
   // 임시용 DTO
    //TODO: 게시판 상세 페이지 확인하고 양식에 맞게 수정예정.
    private long request_id; // 게시글 아이디

    private int user_id;

    private String request_title;
    private String request_content;
    private int target_amount;
    private int current_amount;

    private Status status;

    private int request_hits;
    private int request_likes;

    public BoardResponse(Board board) {
        this.request_id = board.getRequest_id();
        this.user_id = board.getUser_id();
        this.request_title = board.getRequest_title();
        this.request_content = board.getRequest_content();
        this.target_amount = board.getTarget_amount();
        this.current_amount = board.getCurrent_amount();
        this.status = board.getStatus();
        this.request_hits = board.getRequest_hits();
        this.request_likes = board.getRequest_likes();
    }
}
