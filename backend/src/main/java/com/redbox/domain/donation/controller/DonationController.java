package com.redbox.domain.donation.controller;

import com.redbox.domain.auth.dto.CustomUserDetails;
import com.redbox.domain.donation.application.DonationService;
import com.redbox.domain.donation.application.DonationStatsService;
import com.redbox.domain.donation.dto.DonationRequest;

import com.redbox.domain.donation.dto.MyDonationStatsResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class DonationController {

    private final Map<String, DonationService> donationServiceMap;

    private final DonationStatsService donationStatsService;

    @PostMapping("/donate/{type}")
    public ResponseEntity<String> donate(@PathVariable String type, @RequestBody DonationRequest donationRequest) {
        // 기부 방식에 따른 서비스 선택
        DonationService donationService = donationServiceMap.get(type.toLowerCase());

        // TODO: ERROR CODE 변경
        if (donationService == null) {
            return ResponseEntity.badRequest().body("잘못된 기부 방식 요청");
        }

        donationService.processDonation(donationRequest);
        // TODO: message dto 에 담기
        return ResponseEntity.ok("기부 성공");
    }

    @GetMapping("/users/my-donation-stats")
    public ResponseEntity<MyDonationStatsResponse> getMyDonationStats() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long userId = userDetails.getUserId();

        // 기부 통계 조회
        int totalDonatedCards = donationStatsService.getTotalDonatedCards(userId);
        int patientsHelped = donationStatsService.getPatientsHelped(userId);
        // TODO: 내가 작성한 진행중인 요청 게시글 조회 추후에 추가

        MyDonationStatsResponse response = new MyDonationStatsResponse(totalDonatedCards, patientsHelped);
        return ResponseEntity.ok(response);
    }
}
