package com.redbox.domain.redbox.applicaction;

import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.donation.entity.RedboxDonationDetail;
import com.redbox.domain.donation.entity.RedboxDonationGroup;
import com.redbox.domain.donation.repository.RedboxDonationDetailRepository;
import com.redbox.domain.donation.repository.RedboxDonationGroupRepository;
import com.redbox.domain.redcard.entity.Redcard;
import com.redbox.domain.redcard.entity.RedcardStatus;
import com.redbox.domain.redcard.repository.RedcardRepository;
import com.redbox.domain.redcard.service.RedcardService;
import com.redbox.domain.user.service.UserService;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

class RedboxServiceTest {

    @Mock
    private RedboxDonationGroupRepository redboxDonationGroupRepository;

    @Mock
    private RedboxDonationDetailRepository redboxDonationDetailRepository;

    @Mock
    private RedcardRepository redcardRepository;

    @Mock
    private UserService userService;

    @Mock
    private RedcardService redcardService;

    @Mock
    private EntityManager entityManager;

    @InjectMocks
    private RedboxService redboxService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @Transactional
    void processDonation_shouldSaveRedboxDonationGroupAndDetails() {
        // Arrange
        DonationRequest donationRequest = DonationRequest.builder()
                                                         .amount(2)
                                                         .message("힘내세용")
                                                         .build();
        Long donationUserId = 1L;

        Redcard redcard1 = Redcard.builder()
                                  .userId(1L)
                                  .donationDate(LocalDate.now())
                                  .serialNumber("12345")
                                  .redcardStatus(RedcardStatus.AVAILABLE)
                                  .build();
        Redcard redcard2 = Redcard.builder()
                                  .userId(1L)
                                  .donationDate(LocalDate.now())
                                  .serialNumber("67890")
                                  .redcardStatus(RedcardStatus.AVAILABLE)
                                  .build();
        List<Redcard> redcardList = Arrays.asList(redcard1, redcard2);

        when(userService.getCurrentUserId()).thenReturn(donationUserId);
        when(redcardRepository.findByUserId(donationUserId)).thenReturn(redcardList);

        // Act
        redboxService.processDonation(donationRequest);

        // Assert
        // RedboxDonationGroup 저장 여부 확인
        ArgumentCaptor<RedboxDonationGroup> redboxDonationGroupCaptor = ArgumentCaptor.forClass(RedboxDonationGroup.class);
        verify(redboxDonationGroupRepository).save(redboxDonationGroupCaptor.capture());
        RedboxDonationGroup savedRedboxDonationGroup = redboxDonationGroupCaptor.getValue();
        assert savedRedboxDonationGroup.getDonationUserId().equals(donationUserId);
        assert savedRedboxDonationGroup.getDonationAmount() == 2;
        assert savedRedboxDonationGroup.getDonationMessage().equals("Test message");

        // RedboxDonationDetail 저장 여부 확인
        ArgumentCaptor<RedboxDonationDetail> redboxDonationDetailCaptor = ArgumentCaptor.forClass(RedboxDonationDetail.class);
        verify(redboxDonationDetailRepository, times(2)).save(redboxDonationDetailCaptor.capture());
        List<RedboxDonationDetail> savedDetails = redboxDonationDetailCaptor.getAllValues();
        assert savedDetails.size() == 2;
        assert savedDetails.get(0).getRedboxDonationId().equals(savedRedboxDonationGroup.getId());
        assert savedDetails.get(1).getRedboxDonationId().equals(savedRedboxDonationGroup.getId());
    }

    @Test
    void processDonation_shouldHandleInsufficientRedcards() {
        // Arrange
        DonationRequest donationRequest = DonationRequest.builder()
                                                         .amount(5)
                                                         .message("힘내세용")
                                                         .build();
        Long donationUserId = 1L;

        // 보유한 레드카드가 부족한 경우
        Redcard redcard = Redcard.builder()
                                 .userId(1L)
                                 .donationDate(LocalDate.now())
                                 .serialNumber("12345")
                                 .redcardStatus(RedcardStatus.AVAILABLE)
                                 .build();
        List<Redcard> redcardList = Arrays.asList(redcard);

        when(userService.getCurrentUserId()).thenReturn(donationUserId);
        when(redcardRepository.findByUserId(donationUserId)).thenReturn(redcardList);

        // Act & Assert
        try {
            redboxService.processDonation(donationRequest);
        } catch (RuntimeException e) {
            assert e.getMessage().equals("보유량 보다 많은 수의 기부를 할 수 없습니다. 보유량 : 1 기부 요청 : 5");
        }
    }
}