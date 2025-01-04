package com.redbox.domain.donation.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Entity
@Table(name = "donation_groups")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DonationGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donation_group_id")
    private Long id;
    private Long donorId;
    private Long receiverId;
    @Enumerated(EnumType.STRING)
    private DonationType donationType;
    private int donationAmount;
    private LocalDate donationDate;
    private String donationMessage;

    @Builder
    public DonationGroup(Long donorId, Long receiverId, DonationType donationType, int donationAmount, LocalDate donationDate, String donationMessage) {
        this.donorId = donorId;
        this.receiverId = receiverId;
        this.donationType = donationType;
        this.donationAmount = donationAmount;
        this.donationDate = donationDate;
        this.donationMessage = donationMessage;
    }

    public void donateConfirm() {
        this.donationType = DonationType.REQUEST;
    }

    public void donateCancel() {
        this.donationType = DonationType.CANCEL;
    }
}
