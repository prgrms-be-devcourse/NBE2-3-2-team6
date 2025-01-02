package com.redbox.domain.donation.application;

import com.redbox.domain.donation.repository.DonationGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DonationStatsService {

    private final DonationGroupRepository donationGroupRepository;

    public int getTotalDonatedCards(Long userId) {
        int total = donationGroupRepository.sumDonationAmountByDonorId(userId);
        return total;
    }

    public int getPatientsHelped(Long userId) {
        int patients = donationGroupRepository.countDistinctReceiverIdByDonorIdAndReceiverIdNot(userId, 0L);
        return patients;
    }

    // TODO: 내가 작성한 진행중인 요청 게시글 조회 기능 추후에 추가
}