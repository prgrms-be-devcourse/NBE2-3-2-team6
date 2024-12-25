package com.redbox.domain.redcard.entity;

import com.redbox.domain.user.entity.User;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    private LocalDate donationDate;
    private String serialNumber;

    private RedcardStatus redcardStatus;

    @Builder
    public Redcard(User user, LocalDate donation_date, String serialNumber, RedcardStatus redcardStatus) {
        this.user = user;
        this.donationDate = donation_date;
        this.serialNumber = serialNumber;
        this.redcardStatus = redcardStatus;
    }

    // 헌혈증 소지자가 바뀔때 사용하는 메서드
    public void updateUser(User user) {
        this.user = user;
    }
}
