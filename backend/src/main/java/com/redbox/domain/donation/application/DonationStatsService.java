package com.redbox.domain.donation.application;

import com.redbox.domain.donation.exception.DonationStatsException;
import com.redbox.domain.donation.repository.DonationGroupRepository;
import com.redbox.global.exception.ErrorCode;
import com.redbox.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DonationStatsService {

    private final DonationGroupRepository donationGroupRepository;
    private final UserService userService;

    public Long getCurrentUserId() {
        return userService.getCurrentUserId();
    }

    public int getTotalDonatedCards(Long userId) {
        try {
            Integer total = donationGroupRepository.sumDonationAmountByDonorId(userId);
            return (total != null) ? total : 0;
        } catch (Exception e) {
            throw new DonationStatsException(ErrorCode.STATS_CALCULATION_FAILED);
        }
    }

    public int getPatientsHelped(Long userId) {
        try {
            Integer patients = donationGroupRepository.countDistinctReceiverIdByDonorIdAndReceiverIdNot(userId, 0L);
            return (patients != null) ? patients : 0;
        } catch (Exception e) {
            throw new DonationStatsException(ErrorCode.STATS_CALCULATION_FAILED);
        }
    }

    // TODO: 내가 작성한 진행중인 요청 게시글 조회 기능 추후에 추가
}
