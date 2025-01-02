package com.redbox.domain.dashboard.service;

import com.redbox.domain.dashboard.dto.DashboardResponse;
import com.redbox.domain.dashboard.dto.UserInfo;
import com.redbox.domain.dashboard.dto.DonationStats;
import com.redbox.domain.user.entity.User;
import com.redbox.domain.user.service.UserService;
import com.redbox.domain.donation.application.DonationStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserService userService;
    private final DonationStatsService donationStatsService;

    public DashboardResponse getDashboardData() {
        // 1. 사용자 정보 조회
        User user = userService.getCurrentUser();
        UserInfo userInfo = new UserInfo(
                user.getName(),
                user.getBirth(),
                user.getGender(),
                user.getPhoneNumber()
        );

        // 2. 기부 통계 조회
        Long userId = user.getId();
        int totalDonatedCards = donationStatsService.getTotalDonatedCards(userId);
        int patientsHelped = donationStatsService.getPatientsHelped(userId);
        LocalDate lastDonationDate = donationStatsService.getLastDonationDate(userId);

        // 3. 등급 계산
        String grade = calculateGrade(totalDonatedCards);

        // 4. 대시보드 응답 생성
        DonationStats donationStats = new DonationStats(totalDonatedCards, patientsHelped, grade, lastDonationDate);
        return new DashboardResponse(userInfo, donationStats);
    }

    private String calculateGrade(int totalDonatedCards) {
        if (totalDonatedCards >= 50) {
            return "VIP";
        } else if (totalDonatedCards >= 20) {
            return "GOLD";
        } else if (totalDonatedCards >= 10) {
            return "SILVER";
        } else {
            return "BRONZE";
        }
    }
}
