package com.redbox.domain.redcard.service;

import com.redbox.domain.auth.dto.CustomUserDetails;
import com.redbox.domain.redcard.dto.RegisterRedcardRequest;
import com.redbox.domain.redcard.entity.Redcard;
import com.redbox.domain.redcard.entity.RedcardStatus;
import com.redbox.domain.redcard.exception.DuplicateSerialNumberException;
import com.redbox.domain.redcard.repository.RedcardRepository;
import com.redbox.domain.user.entity.User;
import com.redbox.domain.user.repository.UserRepository;
import com.redbox.domain.user.service.UserService;
import com.redbox.global.exception.BusinessException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.InstanceOfAssertFactories.type;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
@SpringBootTest
class RedcardServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RedcardRepository redcardRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RedcardService redcardService;

    private User setUserAndSecurityContext(String email) {
        User user = User.builder()
                .email(email)
                .build();
        userRepository.save(user);

        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        CustomUserDetails userDetails = new CustomUserDetails(user);

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        SecurityContextHolder.setContext(securityContext);

        return user;
    }
    
    @DisplayName("로그인한 사용자가 헌혈증 등록을 성공한다.")
    @Test
    void registerRedcardSuccessful() throws Exception {
        //given
        User user = setUserAndSecurityContext("test@test.com");
        RegisterRedcardRequest request = RegisterRedcardRequest.builder()
                .cardNumber("00-00-000000")
                .donationDate(LocalDate.of(2024, 12, 1))
                .hospitalName("헌혈의집 충북대센터")
                .build();

        //when
        redcardService.registerRedCard(request);
        
        //then
        Redcard savedRedcard = redcardRepository.findBySerialNumber(request.getCardNumber())
                .orElseThrow();

        assertThat(savedRedcard.getUserId()).isEqualTo(user.getId());
        assertThat(savedRedcard.getSerialNumber()).isEqualTo(request.getCardNumber());
        assertThat(savedRedcard.getDonationDate()).isEqualTo(request.getDonationDate());
        assertThat(savedRedcard.getHospitalName()).isEqualTo(request.getHospitalName());
        assertThat(savedRedcard.getRedcardStatus()).isEqualTo(RedcardStatus.AVAILABLE);
    }
    
    @DisplayName("헌혈증 등록시 이미 등록된 헌혈증 번호이면 예외가 발생한다.")
    @Test
    void registerRedcardWithDuplicateSerialNumberThrowException() throws Exception {
        //given
        User user = setUserAndSecurityContext("test@test.com");
        RegisterRedcardRequest request = RegisterRedcardRequest.builder()
                .cardNumber("00-00-000000")
                .donationDate(LocalDate.of(2024, 12, 1))
                .hospitalName("헌혈의집 충북대센터")
                .build();
        redcardService.registerRedCard(request);

        RegisterRedcardRequest duplicateRequest = RegisterRedcardRequest.builder()
                .cardNumber("00-00-000000")
                .donationDate(LocalDate.of(2024, 12, 1))
                .hospitalName("헌혈의집 충북대센터")
                .build();

        //when & then
        assertThatThrownBy(() -> redcardService.registerRedCard(duplicateRequest))
                .isInstanceOf(DuplicateSerialNumberException.class)
                .hasMessage("이미 등록된 헌혈증입니다.")
                .asInstanceOf(type(BusinessException.class))
                .extracting(ex -> ex.getErrorCodes().getStatus())
                .isEqualTo(HttpStatus.BAD_REQUEST);
    }
}