package com.redbox.domain.admin.application;

import com.redbox.domain.admin.dto.AdminApproveRequest;
import com.redbox.domain.admin.dto.AdminListResponse;
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
    @Transactional
    public List<AdminListResponse> getRequests() {
        // 요청중 리스트만 추출
        List<Request> requestList = requestRepository.findByRequestStatus(RequestStatus.REQUEST);
        return requestList.stream().map(AdminListResponse::new).collect(Collectors.toList());
    }

    // 요청 게시글 승인 or 거절
    @Transactional
    public void approveRequest(AdminApproveRequest adminApproveRequest) {

        System.out.println(adminApproveRequest.getRequestId());
        Request changeRequest = requestRepository.findById(adminApproveRequest.getRequestId()).orElseThrow(RequestNotFoundException::new);
        String approveStatus = adminApproveRequest.getApproveStatus();

        switch (approveStatus) {
            case "승인" :
                changeRequest.setRequestStatus(RequestStatus.APPROVE);
                break;
            case "거절" :
                changeRequest.setRequestStatus(RequestStatus.REJECT);
                break;
            default:
                System.out.println("잘못된 접근"); // 출력 말고 처리 필요함
        }

        requestRepository.save(changeRequest);
    }
}
