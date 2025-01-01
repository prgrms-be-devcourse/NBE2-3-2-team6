package com.redbox.domain.redcard.entity;

import com.redbox.domain.redcard.exception.PendingRedcardException;
import com.redbox.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Entity
@Table(name = "redcards")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Redcard extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "redcard_id")
    private Long id;
    private Long userId;
    private LocalDate donationDate;
    private String serialNumber;
    private String hospitalName;

    @Enumerated(EnumType.STRING)
    private RedcardStatus redcardStatus;

    @Builder
    public Redcard(Long userId, LocalDate donationDate, String serialNumber, String hospitalName, RedcardStatus redcardStatus) {
        this.userId = userId;
        this.donationDate = donationDate;
        this.serialNumber = serialNumber;
        this.hospitalName = hospitalName;
        this.redcardStatus = redcardStatus;
    }

    // 헌혈증 소지자가 바뀔때 사용하는 메서드
    public void updateUser(Long userId) {
        this.userId = userId;
    }

    public void changeRedcardStatus(RedcardStatus status) {
        this.redcardStatus = status;
    }
}
