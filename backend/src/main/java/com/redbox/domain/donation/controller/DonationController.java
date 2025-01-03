package com.redbox.domain.donation.controller;

import com.redbox.domain.donation.application.DonationService;
import com.redbox.domain.donation.application.DonationStatsService;
import com.redbox.domain.donation.application.UserDonationService;
import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.donation.dto.Top5DonorResponse;
import com.redbox.domain.donation.exception.InvalidDonationTypeException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class DonationController {

    private final Map<String, DonationService> donationServiceMap;

    private final DonationStatsService donationStatsService;
    private final UserDonationService userDonationService;

    @PostMapping("/donate/{type}")
    public ResponseEntity<String> donate(@PathVariable String type, @RequestBody DonationRequest donationRequest) {
        DonationService donationService = donationServiceMap.get(type.toLowerCase());

        if (donationService == null) {
            throw new InvalidDonationTypeException();
        }

        donationService.processDonation(donationRequest);
        // TODO: message dto 에 담기
        return ResponseEntity.ok("기부 성공");
    }

    @GetMapping("/donations/top")
    public ResponseEntity<List<Top5DonorResponse>> getTop5Donor() {
        return ResponseEntity.ok(userDonationService.getTop5Donor());
    }

    @PutMapping("/donate/cancel/{type}/{receiveId}")
    public ResponseEntity<String> donateCancel(@PathVariable String type, @PathVariable long receiveId) {
        DonationService donationService = donationServiceMap.get(type.toLowerCase());

        if (donationService == null) {
            throw new InvalidDonationTypeException();
        }

        donationService.cancelDonation(receiveId);

        return ResponseEntity.ok("기부 취소");
    }
}