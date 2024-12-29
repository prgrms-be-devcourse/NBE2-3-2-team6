package com.redbox.domain.admin.controller;

import com.redbox.domain.admin.application.AdminService;
import com.redbox.domain.admin.dto.AdminListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/admin/requests")
    public ResponseEntity<List<AdminListResponse>> getRequests() {
        List<AdminListResponse> response = adminService.getRequests();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
