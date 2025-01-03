package com.redbox.domain.admin.application;

import com.redbox.domain.admin.dto.AdminApproveRequest;
import com.redbox.domain.admin.dto.AdminDetailResponse;
import com.redbox.domain.admin.dto.AdminListResponse;
import com.redbox.domain.admin.exception.InvalidApproveStatusException;
import com.redbox.domain.attach.dto.AttachFileResponse;
import com.redbox.domain.request.entity.Request;
import com.redbox.domain.request.entity.RequestStatus;
import com.redbox.domain.request.exception.RequestNotFoundException;
import com.redbox.domain.request.repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final RequestRepository requestRepository;

    // 요청 게시글 리스트 조회
    public List<AdminListResponse> getRequests() {
        // 요청중 리스트만 추출
        List<Request> requestList = requestRepository.findByRequestStatus(RequestStatus.REQUEST);
        return requestList.stream().map(AdminListResponse::new).collect(Collectors.toList());
    }

    // 요청 게시글 승인 or 거절
    @Transactional
    public void approveRequest(Long requestId, AdminApproveRequest adminApproveRequest) {

        Request changeRequest = requestRepository.findById(requestId).orElseThrow(RequestNotFoundException::new);
        String approveStatus = adminApproveRequest.getApproveStatus();

        switch (approveStatus) {
            case "승인" :
                changeRequest.approve();
                break;
            case "거절" :
                changeRequest.reject();
                changeRequest.expired();
                break;
            default:
                throw new InvalidApproveStatusException();
        }

        requestRepository.save(changeRequest);
    }

    // 요청 게시글 상세조회
    public AdminDetailResponse getRequestDetails(Long requestId) {
        Request request = requestRepository.findById(requestId).orElseThrow(RequestNotFoundException::new);
        return new AdminDetailResponse(
                request.getRequestId(),
                request.getRequestTitle(),
                request.getCreatedBy(),
                request.getCreatedAt().toLocalDate(),
                request.getDonationStartDate(),
                request.getDonationEndDate(),
                request.getTargetAmount(),
                request.getRequestStatus().getText(),
                request.getRequestHits(),
                request.getRequestContent(),
                request.getAttachFiles()
                        .stream().map(AttachFileResponse::new).toList()
        );
    }
}
