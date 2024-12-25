package com.redbox.domain.redcard.entity;

import com.redbox.domain.redcard.repository.RedcardRepository;
import com.redbox.domain.user.entity.RoleType;
import com.redbox.domain.user.entity.Status;
import com.redbox.domain.user.entity.User;
import com.redbox.domain.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class RedCardTest {

    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private RedcardRepository redcardRepository;

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
        Redcard cardData = Redcard.builder()
                        .user(user)
                        .donation_date(LocalDate.of(1990, 1, 1))
                        .serialNumber("12")
                        .redcardStatus(RedcardStatus.AVAILABLE)
                        .build();

        redcardRepository.save(cardData);

        Redcard redCard = redcardRepository.findBySerialNumber("12").get();

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
        Redcard cardData = Redcard.builder()
                        .user(user)
                        .donation_date(LocalDate.of(1990, 1, 1))
                        .serialNumber("12")
                        .redcardStatus(RedcardStatus.AVAILABLE)
                        .build();

        redcardRepository.save(cardData);
        Redcard redCard = redcardRepository.findBySerialNumber("12").get();

        user.registerRedcard(redCard);

        assertThat(user.countRedcards()).isEqualTo(1);
    }
}