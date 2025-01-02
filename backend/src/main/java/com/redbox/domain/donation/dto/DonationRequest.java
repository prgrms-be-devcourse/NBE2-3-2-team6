package com.redbox.domain.donation.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class DonationRequest {
    private Long userId;  // 기부 받을 user ( 1:1 후원 )
    private Long requestId; // ( 게시글 후원 )
    private int quantity;
    private String comment;

    @Builder
    public DonationRequest(Long userId, Long requestId, int quantity, String comment) {
        this.userId = userId;
        this.requestId = requestId;
        this.quantity = quantity;
        this.comment = comment;
    }
}
