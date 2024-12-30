package com.redbox.domain.donation.application;

import com.redbox.domain.donation.dto.DonationRequest;

public interface DonationService {
    void processDonation(DonationRequest donationRequest);
}
