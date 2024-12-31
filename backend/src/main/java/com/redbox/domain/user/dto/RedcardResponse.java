package com.redbox.domain.user.dto;

import com.redbox.domain.redcard.entity.Redcard;
import com.redbox.domain.redcard.entity.RedcardStatus;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class RedcardResponse {

    private final LocalDate donationDate;
    private final String serialNumber;
    private final RedcardStatus redcardStatus;

    public RedcardResponse(Redcard redcard) {
        this.donationDate = redcard.getDonationDate();
        this.serialNumber = redcard.getSerialNumber();
        this.redcardStatus = redcard.getRedcardStatus();
    }
}
