package com.redbox.domain.redbox.repository;

import com.redbox.domain.redbox.entity.Redbox;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedboxRepository extends JpaRepository<Redbox, Long> {
}

