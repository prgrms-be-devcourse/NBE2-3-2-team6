package com.redbox.domain.request.repository;

import com.redbox.domain.request.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardDetailRepository extends JpaRepository<Board, Long> {
}
