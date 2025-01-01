package com.redbox.domain.redbox.controller;

import com.redbox.domain.redbox.dto.TotalCountResponse;
import com.redbox.domain.redbox.applicaction.RedboxService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class RedboxController {

    private final RedboxService redboxService;

    @GetMapping("/redbox/total-count")
    public ResponseEntity<TotalCountResponse> getTotalCount() {
        TotalCountResponse response = redboxService.getTotalCount();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/redbox/received-patients")
    public ResponseEntity<Long> getReceivedPatientsCount() {
        long count = redboxService.getReceivedPatientsCount();
        return ResponseEntity.ok(count);
    }

}
