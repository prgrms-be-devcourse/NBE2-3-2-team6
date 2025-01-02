package com.redbox.domain.donation.repository;

import com.redbox.domain.donation.entity.DonationDetail;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationDetailRepository extends JpaRepository<DonationDetail, Long> {
}
