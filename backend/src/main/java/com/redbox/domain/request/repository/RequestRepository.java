package com.redbox.domain.request.repository;

import com.redbox.domain.request.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, Long> {
}
