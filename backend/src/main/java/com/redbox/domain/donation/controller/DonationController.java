package com.redbox.domain.donation.controller;

import com.redbox.domain.donation.application.DonationService;
import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.donation.exception.InvalidDonationTypeException;

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
        DonationService donationService = donationServiceMap.get(type.toLowerCase());

        if (donationService == null) {
            throw new InvalidDonationTypeException();
        }

        donationService.processDonation(donationRequest);
        // TODO: message dto 에 담기
        return ResponseEntity.ok("기부 성공");
    }
}
