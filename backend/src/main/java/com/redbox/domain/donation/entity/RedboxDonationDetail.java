package com.redbox.domain.donation.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Table(name = "redbox_donation_details")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RedboxDonationDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "redbox_donation_detail_id")
    private Long id;
    private Long redboxDonationId;
    private Long redcardId;

    @Builder
    public RedboxDonationDetail(Long redboxDonationId, Long redcardId) {
        this.redboxDonationId = redboxDonationId;
        this.redcardId = redcardId;
    }
}
