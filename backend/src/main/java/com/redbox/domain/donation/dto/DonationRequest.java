package com.redbox.domain.donation.dto;

public class DonationRequest {
    private Long userId;  // 기부 받을 user ( 1:1 후원 )
    private Long requestId; // ( 게시글 후원 )
    private int amount;
    private String message;
}
