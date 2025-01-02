package com.redbox.domain.donation.repository;

import com.redbox.domain.donation.entity.DonationGroup;

import com.redbox.domain.user.dto.DonationResponse;
import com.redbox.domain.user.dto.ReceptionResponse;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query("SELECT new com.redbox.domain.user.dto.DonationResponse(d, " +
            "CASE WHEN d.receiverId = 0 THEN '레드박스' ELSE u.name END) " +
            "FROM DonationGroup d " +
            "LEFT JOIN User u ON d.receiverId = u.id " +
            "WHERE d.donorId = :donorId")
    Page<DonationResponse> findAllWithReceiverNameByDonorId(Long donorId, Pageable pageable);

    @Query("SELECT new com.redbox.domain.user.dto.ReceptionResponse(d, " +
            "CASE WHEN d.donorId = 0 THEN '레드박스' ELSE u.name END) " +
            "FROM DonationGroup d " +
            "LEFT JOIN User u ON d.receiverId = u.id " +
            "WHERE d.receiverId = :receiverId")
    Page<ReceptionResponse> findAllWithDonorNameByReceiverId(Long receiverId, Pageable pageable);

}
