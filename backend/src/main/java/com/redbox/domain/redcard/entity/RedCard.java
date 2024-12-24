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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RedCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "redcard_id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private LocalDate donationDate;
    private String serialNumber;

    private Status redCardStatus;

    @Builder
    public RedCard(User user, LocalDate donation_date, String serial_number, Status redCardStatus) {
        this.user = user;
        this.donationDate = donation_date;
        this.serialNumber = serial_number;
        this.redCardStatus = redCardStatus;
    }

    public void updateUser(User user) {
        this.user = user;
    }
}
