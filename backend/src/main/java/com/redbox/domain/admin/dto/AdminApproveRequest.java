package com.redbox.domain.admin.dto;

import lombok.Getter;

@Getter
public class AdminApproveRequest {
    private Long requestId; // 게시글 ID
    private String approveStatus; // 승인, 거절
}
