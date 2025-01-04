package com.redbox.domain.request.repository;

import com.redbox.domain.request.dto.ListResponse;
import com.redbox.domain.request.dto.RequestFilter;
import com.redbox.domain.request.entity.Request;
import com.redbox.domain.request.entity.RequestStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long>, RequestRepositoryCustom {
    List<Request> findByRequestStatus(RequestStatus requestStatus);

    List<Request> findByDonationEndDateBeforeAndProgressNot(LocalDate date, RequestStatus progress);

    @Query("SELECT r FROM Request r WHERE r.userId = :userId AND r.requestStatus != 'DROP'")
    Page<Request> findAllByUserIdAndNotDropStatus(Long userId, Pageable pageable);

    @Query("SELECT COUNT(r) FROM Request r WHERE r.userId = :userId AND r.requestStatus = 'APPROVE' AND r.progress = 'IN_PROGRESS'")
    int countInProgressRequestsByUserId(Long userId);

    @Query("SELECT COUNT(r) FROM Request r WHERE r.requestStatus = 'APPROVE' AND r.progress = 'IN_PROGRESS'")
    int countAllInProgressRequests();
}