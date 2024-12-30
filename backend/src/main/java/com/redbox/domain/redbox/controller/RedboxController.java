package com.redbox.domain.redbox.controller;

import com.redbox.domain.redbox.applicaction.RedboxSerivce;
import com.redbox.domain.redbox.dto.RedboxInfoResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class RedboxController {

    private final RedboxSerivce redboxSerivce;

    @GetMapping("/R-a-seo-Su-jung-HaeYo")
    private ResponseEntity<RedboxInfoResponse> getRedboxInfo() {

        RedboxInfoResponse request = redboxSerivce.getRedboxInfo();
        return ResponseEntity.ok(request);
    }
}
