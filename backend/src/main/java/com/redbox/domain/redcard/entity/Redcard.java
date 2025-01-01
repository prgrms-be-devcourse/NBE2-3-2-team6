package com.redbox.domain.redcard.entity;

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
public class Redcard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "redcard_id")
    private Long id;
    //레드박스 소유시 0
    private Long userId;
    private LocalDate donationDate;
    private String serialNumber;

    private RedcardStatus redcardStatus;

    @Builder
    public Redcard(Long userId, LocalDate donationDate, String serialNumber, RedcardStatus redcardStatus) {
        this.userId = userId;
        this.donationDate = donationDate;
        this.serialNumber = serialNumber;
        this.redcardStatus = redcardStatus;
    }

    // 헌혈증 소지자가 바뀔때 사용하는 메서드
    public void updateUser(Long userId) {
        this.userId = userId;
    }
}
