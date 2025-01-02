package com.redbox.domain.donation.repository;

import com.redbox.domain.donation.entity.DonationGroup;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DonationGroupRepository extends JpaRepository<DonationGroup, Long> {

    long countByDonorId(Long donorId);

    @Query("SELECT SUM(d.donationAmount) FROM DonationGroup d WHERE d.donorId = :donorId")
    Integer sumDonationAmountByDonorId(@Param("donorId") Long donorId);

    @Query("SELECT COUNT(DISTINCT d.receiverId) FROM DonationGroup d WHERE d.donorId = :donorId AND d.receiverId != :redboxId")
    Integer countDistinctReceiverIdByDonorIdAndReceiverIdNot(@Param("donorId") Long donorId, @Param("redboxId") Long redboxId);

    @Query("SELECT COUNT(DISTINCT d.receiverId) FROM DonationGroup d WHERE d.donorId = 0 AND d.receiverId != 0")
    Integer getHelpedPatientsCount();
}
