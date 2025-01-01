//package com.redbox.domain.redcard.service;
//
//import com.redbox.domain.redcard.entity.Redcard;
//import com.redbox.domain.redcard.entity.RedcardStatus;
//import com.redbox.domain.redcard.repository.RedcardRepository;
//import com.redbox.domain.user.service.UserService;
//
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//class RedCardServiceTest {
//
//    @Mock
//    private UserService userService;
//
//    @Mock
//    private RedcardRepository redcardRepository;
//
//    @InjectMocks
//    private RedcardService redcardService;
//
//    @Test
//    @DisplayName("올바른 수의 기부 요청이 왔을 때 실행 테스트")
//    void updateRedCardListTest1() {
//        // Given
//        Long donateUserId = 1L;
//        Long receiveUserId = 2L;
//        int count = 3;
//
//        List<Redcard> redcardList = new ArrayList<>();
//        for (int i = 0; i < 5; i++) {
//            Redcard redcard = Mockito.mock(Redcard.class);
//            redcardList.add(redcard);
//        }
//
//        // Mocking
//        when(userService.getCurrentUserId()).thenReturn(donateUserId);
//        when(redcardRepository.findByUserId(donateUserId)).thenReturn(redcardList);
//
//        // When
//        redcardService.updateRedCardList(count, receiveUserId);
//
//        // Then
//        for (int i = 0; i < count; i++) {
//            verify(redcardList.get(i)).updateUser(receiveUserId);
//        }
//        verify(userService, times(1)).getCurrentUserId();
//        verify(redcardRepository, times(1)).findByUserId(donateUserId);
//    }
//
//    @Test
//    @DisplayName("기부자가 본인 소유보다 더 많은 기부 요청이 올라왔을 때 테스트 (터져야함)")
//    void updateRedCardListTest2() {
//        // Given
//        Long donateUserId = 1L;
//        Long receiveUserId = 2L;
//        int count = 6; // Exceeds the list size
//
//        List<Redcard> redcardList = new ArrayList<>();
//        for (int i = 0; i < 5; i++) {
//            Redcard redcard = Mockito.mock(Redcard.class);
//            redcardList.add(redcard);
//        }
//
//        // Mocking
//        when(userService.getCurrentUserId()).thenReturn(donateUserId);
//        when(redcardRepository.findByUserId(donateUserId)).thenReturn(redcardList);
//
//        // When & Then
//        Assertions.assertThrows(IllegalArgumentException.class, () -> {
//            redcardService.updateRedCardList(count, receiveUserId);
//        });
//
//        verify(userService, times(1)).getCurrentUserId();
//        verify(redcardRepository, times(1)).findByUserId(donateUserId);
//    }
//
//    @Test
//    @DisplayName("기부 성공했을 때, 소유자가 바뀌는지 확인 테스트")
//    void updateRedCardListTest3() {
//        // Given
//        Long donateUserId = 100L;
//        Long receiveUserId = 200L;
//        int donateCount = 3;
//        List<Redcard> redcards = new ArrayList<>();
//        for (int i = 1; i <= 5; i++) {
//            redcards.add(Redcard.builder()
//                                .userId(donateUserId)
//                                .donation_date(LocalDate.now())
//                                .serialNumber("1111-" + i)
//                                .redcardStatus(RedcardStatus.AVAILABLE)
//                                .build());
//        }
//
//        when(userService.getCurrentUserId()).thenReturn(donateUserId);
//        when(redcardRepository.findByUserId(donateUserId)).thenReturn(redcards);
//
//        // When
//        redcardService.updateRedCardList(donateCount, receiveUserId);
//
//        // Then
//        verify(redcardRepository, times(1)).findByUserId(donateUserId);
//        assertThat(redcards.stream().filter(r -> r.getUserId().equals(receiveUserId)).count())
//                .isEqualTo(donateCount); // 기부된 카드 수 확인
//        assertThat(redcards.stream().filter(r -> r.getUserId().equals(donateUserId)).count())
//                .isEqualTo(redcards.size() - donateCount); // 남은 카드 수 확인
//    }
//}
//
