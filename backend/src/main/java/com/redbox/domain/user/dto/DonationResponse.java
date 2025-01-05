package com.redbox.domain.user.dto;

import com.redbox.domain.donation.entity.DonationGroup;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class DonationResponse {

    private final String receiverName;
    private final int donationAmount;
    private final LocalDate donationDate;
    private final String donationMessage;
    private final Long donationId;

    public DonationResponse(DonationGroup donationGroup, String receiverName) {
        this.donationId = donationGroup.getId();
        this.receiverName = receiverName;
        this.donationAmount = donationGroup.getDonationAmount();
        this.donationDate = donationGroup.getDonationDate();
        this.donationMessage = donationGroup.getDonationMessage();
    }
}
