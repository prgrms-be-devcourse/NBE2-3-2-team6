package com.redbox.domain.donation.repository;

import com.redbox.domain.donation.entity.DonationGroup;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationGroupRepository extends JpaRepository<DonationGroup, Long> {
}
