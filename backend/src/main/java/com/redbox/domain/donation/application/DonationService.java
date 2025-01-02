package com.redbox.domain.donation.application;

import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.redcard.entity.Redcard;

import java.util.List;

public interface DonationService {
    void processDonation(DonationRequest donationRequest);
}
