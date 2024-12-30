package com.redbox.domain.donation.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Entity
@Table(name = "redbox_donation_groups")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RedboxDonationGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "redbox_donation_group_id")
    private Long id;
    private Long donationUserId;
    //TODO: Redbox branch 의 Count 를 사용할 예정
    private int donationAmount;
    private LocalDate donationDate;
    private String donationMessage;

    @Builder
    public RedboxDonationGroup(Long userId, int donationAmount, LocalDate donationDate, String donationMessage) {
        this.donationUserId = userId;
        this.donationAmount = donationAmount;
        this.donationDate = donationDate;
        this.donationMessage = donationMessage;
    }
}
