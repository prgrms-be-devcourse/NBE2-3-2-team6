package com.redbox.domain.donation.entity;

import com.redbox.domain.redbox.dto.Count;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;

import java.time.LocalDate;
import java.util.Objects;

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

        RedboxDonationGroup redboxDonationGroup = (RedboxDonationGroup) o;
        return Objects.equals(id, redboxDonationGroup.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
