package com.redbox.domain.donation.dto;

import lombok.Getter;

@Getter
public class Top5DonorResponse {

    private final Long rank;
    private final Long donorId;
    private final String donorName;
    private final Long totalAmount;

    public Top5DonorResponse(Long rank, Long donorId, String donorName, Long totalAmount) {
        this.rank = rank;
        this.donorId = donorId;
        this.donorName = donorName;
        this.totalAmount = totalAmount;
    }
}
