package com.redbox.domain.redcard.entity;

import com.redbox.domain.redcard.repository.RedCardRepository;
import com.redbox.domain.user.entity.RoleType;
import com.redbox.domain.user.entity.Status;
import com.redbox.domain.user.entity.User;
import com.redbox.domain.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.assertj.core.api.Assertions.*;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class RedCardTest {

    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  RedCardRepository redCardRepository;

    @Test
    @DisplayName("레드카드 생성 테스트")
    @Transactional
    void createRedCardTest() {
        //Given
        User data = User.builder()
                        .name("sb")
                        .birth(LocalDate.of(1990, 1, 1))
                        .email("s111b@gmail.com")
                        .roleType(RoleType.USER)
                        .status(Status.ACTIVE).build();

        userRepository.save(data);
        User user = userRepository.findByEmail("s111b@gmail.com");

        //When & Then
        RedCard cardData = RedCard.builder().
                                 user(user).
                                 donation_date(LocalDate.of(1990, 1, 1)).
                                 serial_number("12").
                                 redCardStatus(com.redbox.domain.redcard.entity.Status.AVAILABLE).
                                 build();

        redCardRepository.save(cardData);

        RedCard redCard = redCardRepository.findBySerialNumber("12");

        assertThat(redCard.getUser().getId()).isEqualTo(user.getId());
    }

    @Test
    @DisplayName("유저에서 레드카드 등록 테스트")
    @Transactional
    void registerRedCardTest() {
        //Given
        User data = User.builder()
                        .name("sb")
                        .birth(LocalDate.of(1990, 1, 1))
                        .email("s111b@gmail.com")
                        .roleType(RoleType.USER)
                        .status(Status.ACTIVE).build();

        userRepository.save(data);
        User user = userRepository.findByEmail("s111b@gmail.com");

        //When & Then
        RedCard cardData = RedCard.builder().
                                  user(user).
                                  donation_date(LocalDate.of(1990, 1, 1)).
                                  serial_number("12").
                                  redCardStatus(com.redbox.domain.redcard.entity.Status.AVAILABLE).
                                  build();

        redCardRepository.save(cardData);
        RedCard redCard = redCardRepository.findBySerialNumber("12");

        user.registerRedCard(redCard);

        assertThat(user.countRedCards()).isEqualTo(1);
    }
}