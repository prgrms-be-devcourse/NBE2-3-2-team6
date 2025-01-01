package com.redbox.domain.redbox.applicaction;

import com.redbox.domain.donation.application.DonationService;
import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.redbox.dto.TotalCountResponse;
import com.redbox.domain.redbox.entity.Redbox;
import com.redbox.domain.redbox.repository.RedboxRepository;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RedboxService implements DonationService {

    private final RedboxRepository redboxRepository;

    public TotalCountResponse getTotalCount() {
        Redbox redbox = redboxRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("Redbox 정보가 존재하지 않습니다."));

        return new TotalCountResponse(redbox.getTotalCount());
    }

    @Override
    public void processDonation(DonationRequest donationRequest) {
        // 레드박스에게 기부하는 로직
    }
}