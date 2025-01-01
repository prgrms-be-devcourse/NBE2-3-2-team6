package com.redbox.domain.donation.repository;

import com.redbox.domain.donation.entity.RedboxDonationDetail;
import com.redbox.domain.redbox.entity.RedboxReceiptGroup;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RedboxDonationDetailRepository extends JpaRepository<RedboxDonationDetail, Long> {
}
