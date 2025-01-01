package com.redbox.domain.donation.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Objects;

@Getter
@Entity
@Table(name = "donation_groups")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DonationGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donation_group_id")
    private Long id;
    private Long donationUserId;
    private int donationAmount;
    private LocalDate donationDate;
    private String donationMessage;

    @Builder
    public DonationGroup(Long userId, int donationAmount, LocalDate donationDate, String donationMessage) {
        this.donationUserId = userId;
        this.donationAmount = donationAmount;
        this.donationDate = donationDate;
        this.donationMessage = donationMessage;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null) {
            return false;
        }
        if (this.getClass() != o.getClass()) {
            return false;
        }

        DonationGroup redboxDonationGroup = (DonationGroup) o;
        return Objects.equals(id, redboxDonationGroup.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
