package com.redbox.domain.redbox.applicaction;

import com.redbox.domain.donation.application.DonationService;
import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.redbox.dto.TotalCountResponse;
import com.redbox.domain.redbox.entity.Redbox;
import com.redbox.domain.redbox.exception.RedboxNotFoundException;
import com.redbox.domain.redbox.repository.RedboxReceiptGroupRepository;
import com.redbox.domain.redbox.repository.RedboxRepository;
import com.redbox.domain.redcard.service.RedcardService;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RedboxService implements DonationService {

    private final RedboxRepository redboxRepository;
    private final RedboxReceiptGroupRepository redboxReceiptGroupRepository;
    private final RedcardService redcardService;

    public TotalCountResponse getTotalCount() {
        Redbox redbox = redboxRepository.findById(1L)
                .orElseThrow(RedboxNotFoundException::new); // RedboxNotFoundException 사용

        return new TotalCountResponse(redbox.getTotalCount());
    }

    public long getReceivedPatientsCount() {
        // "레드박스로부터 받음" 테이블의 행 수를 조회
        return redboxReceiptGroupRepository.count();
    }

    @Override
    public void processDonation(DonationRequest donationRequest) {
        int donationCount = donationRequest.getAmount();
        // Redcard의 userId 가 redbox 소유일 경우 0 으로 고정;
        long receiveUserId = 0L;
        redcardService.updateRedCardList(donationCount, receiveUserId);
    }
}