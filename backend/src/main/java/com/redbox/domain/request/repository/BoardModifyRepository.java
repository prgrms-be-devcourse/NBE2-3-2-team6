package com.redbox.domain.request.repository;

import com.redbox.domain.request.dto.BoardWriteRequest;
import com.redbox.domain.request.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardModifyRepository extends JpaRepository<Board, Long> {
}
