package com.redbox.domain.redcard.entity;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class RedCardTest {

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