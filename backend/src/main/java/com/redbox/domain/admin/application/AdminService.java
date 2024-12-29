package com.redbox.domain.admin.application;

import com.redbox.domain.admin.dto.AdminListResponse;
import com.redbox.domain.request.entity.Request;
import com.redbox.domain.request.entity.RequestStatus;
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

    @Transactional
    public List<AdminListResponse> getRequests() {

        // 요청중 리스트만 추출
        List<Request> requestList = requestRepository.findByRequestStatus(RequestStatus.REQUEST);
        return requestList.stream().map(AdminListResponse::new).collect(Collectors.toList());

    }
}
