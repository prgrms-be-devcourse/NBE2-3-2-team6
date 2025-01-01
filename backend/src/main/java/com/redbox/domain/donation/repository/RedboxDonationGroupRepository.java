package com.redbox.domain.donation.repository;

import com.redbox.domain.donation.entity.RedboxDonationGroup;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RedboxDonationGroupRepository extends JpaRepository<RedboxDonationGroup, Long> {
}
