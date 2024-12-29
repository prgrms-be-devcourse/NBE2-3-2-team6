package com.redbox.domain.admin.controller;

import com.redbox.domain.admin.application.AdminService;
import com.redbox.domain.admin.dto.AdminApproveRequest;
import com.redbox.domain.admin.dto.AdminListResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    // 요청 게시글 리스트 조회
    @GetMapping("/admin/requests")
    public ResponseEntity<List<AdminListResponse>> getRequests() {
        List<AdminListResponse> response = adminService.getRequests();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 요청 게시글 승인
    @PostMapping("/admin/requests")
    public ResponseEntity<Void> addRequest(@RequestBody @Valid AdminApproveRequest request) {
        adminService.approveRequest(request);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
