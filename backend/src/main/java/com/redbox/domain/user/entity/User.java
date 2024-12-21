package com.redbox.domain.user.entity;

import com.redbox.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String email;
    private String password;
    private String name;
    private LocalDate birth;
    private String phoneNumber;

    private String roadAddress;
    private String extraAddress;
    private String detailAddress;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime lastLoginAt;

    @Builder
    public User(String email, String password, String name, LocalDate birth, String phoneNumber, String roadAddress, String extraAddress, String detailAddress, Gender gender, RoleType roleType, Status status) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.birth = birth;
        this.phoneNumber = phoneNumber;
        this.roadAddress = roadAddress;
        this.extraAddress = extraAddress;
        this.detailAddress = detailAddress;
        this.gender = gender;
        this.roleType = roleType;
        this.status = status;
    }

}