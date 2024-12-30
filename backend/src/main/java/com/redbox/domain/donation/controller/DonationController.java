package com.redbox.domain.donation.controller;

import com.redbox.domain.donation.application.DonationService;
import com.redbox.domain.donation.dto.DonationRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class DonationController {

    private final Map<String, DonationService> donationServiceMap;


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
}
