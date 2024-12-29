package com.redbox.domain.request.repository;

import com.redbox.domain.request.entity.Request;
import com.redbox.domain.request.entity.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long>, RequestRepositoryCustom {
    List<Request> findByRequestStatus(RequestStatus requestStatus);
}
