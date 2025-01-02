package com.redbox.domain.donation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MyDonationStatsResponse {
    private int totalCardsReceived;
    private int totalPatientsHelped;
    // TODO: 내가 작성한 진행중인 요청 게시글 조회 기능 추후에 추가

}
