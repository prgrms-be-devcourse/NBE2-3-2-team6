package com.redbox.domain.user.dto;

import com.redbox.domain.donation.entity.DonationGroup;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class PendingResponse {

    private final int donationAmount;
    private final LocalDate donationDate;
    private final String donationMessage;
    private final Long donationId;

    public PendingResponse(DonationGroup donationGroup) {
        this.donationId = donationGroup.getId();
        this.donationAmount = donationGroup.getDonationAmount();
        this.donationDate = donationGroup.getDonationDate();
        this.donationMessage = donationGroup.getDonationMessage();
    }
}
