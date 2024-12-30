package com.redbox.domain.admin.controller;

import com.redbox.domain.admin.application.AdminService;
import com.redbox.domain.admin.dto.AdminApproveRequest;
import com.redbox.domain.admin.dto.AdminDetailResponse;
import com.redbox.domain.admin.dto.AdminListResponse;
import com.redbox.domain.request.application.RequestService;
import com.redbox.domain.request.dto.DetailResponse;
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
    public ResponseEntity<Void> approveRequest(@RequestBody @Valid AdminApproveRequest request) {
        adminService.approveRequest(request);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    // 요청 게시글 상세조회(게시글 상세조회와 동일)
    @GetMapping("/admin/requests/{requestId}")
    public ResponseEntity<AdminDetailResponse> detailRequest(@PathVariable Long requestId) {
        AdminDetailResponse detailResponse = adminService.getRequestDetails(requestId);
        return ResponseEntity.ok(detailResponse);
    }
    
}
