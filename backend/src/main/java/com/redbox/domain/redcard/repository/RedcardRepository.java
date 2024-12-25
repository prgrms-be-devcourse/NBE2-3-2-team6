package com.redbox.domain.redcard.repository;

import com.redbox.domain.redcard.entity.Redcard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedcardRepository extends JpaRepository<Redcard, Long> {

    Redcard findBySerialNumber(String serialNumber);
}

