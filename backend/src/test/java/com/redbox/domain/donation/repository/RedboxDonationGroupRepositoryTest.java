package com.redbox.domain.donation.repository;

import com.redbox.domain.donation.entity.RedboxDonationGroup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RedboxDonationGroupRepositoryTest {

    @Autowired
    private RedboxDonationGroupRepository redboxDonationGroupRepository;

    @DisplayName("save Test")
    @Test
    void saveTest() {
        RedboxDonationGroup donationGroup = RedboxDonationGroup.builder().donationDate(LocalDate.now()).donationAmount(10).userId(1L).build();

        RedboxDonationGroup savedDonationGroup = redboxDonationGroupRepository.save(donationGroup);

        assertEquals(1L, savedDonationGroup.getId());
    }

}