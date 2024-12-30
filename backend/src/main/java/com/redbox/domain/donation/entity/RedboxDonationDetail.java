package com.redbox.domain.donation.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Table(name = "redbox_donation_details")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class RedboxDonationDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "redbox_donation_detail_id")
    private Long id;
    private Long redboxDonationId;
    private Long redcardId;

    //TODO: 모든 필드가 있어야 하므로 빌더 패턴 대신 AllArgsConstructor 사용헀는데, 빌더 패턴 써도 된다면 변경 하는 쪽으로...
}
