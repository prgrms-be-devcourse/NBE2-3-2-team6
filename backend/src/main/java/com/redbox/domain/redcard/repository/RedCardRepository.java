package com.redbox.domain.redcard.repository;

import com.redbox.domain.redcard.entity.RedCard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedCardRepository extends JpaRepository<RedCard, Long> {

    RedCard findBySerialNumber(String serialNumber);
}

