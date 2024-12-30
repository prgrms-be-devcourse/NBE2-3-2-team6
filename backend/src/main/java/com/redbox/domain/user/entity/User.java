package com.redbox.domain.user.entity;

import com.redbox.domain.user.exception.EmptyPasswordException;
import org.springframework.util.StringUtils;
import com.redbox.domain.redcard.entity.Redcard;
import com.redbox.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "users")
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

    public void changePassword(String newPassword) {
        if (!StringUtils.hasText(newPassword)) {
            throw new EmptyPasswordException();
        }
        this.password = newPassword;
    }
}
