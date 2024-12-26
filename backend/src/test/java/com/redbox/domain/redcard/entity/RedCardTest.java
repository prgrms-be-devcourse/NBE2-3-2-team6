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
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

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
        Long userId = 1L;
        LocalDate donationDate = LocalDate.of(2024, 12, 25);
        String serialNumber = "12";
        RedcardStatus status = RedcardStatus.AVAILABLE;

        //When
        Redcard cardData = Redcard.builder()
                        .userId(userId)
                        .donation_date(donationDate)
                        .serialNumber(serialNumber)
                        .redcardStatus(status)
                        .build();

        // Then
        assertEquals(userId, cardData.getUserId());
        assertEquals(donationDate, cardData.getDonationDate());
        assertEquals(serialNumber, cardData.getSerialNumber());
        assertEquals(status, cardData.getRedcardStatus());
    }
}