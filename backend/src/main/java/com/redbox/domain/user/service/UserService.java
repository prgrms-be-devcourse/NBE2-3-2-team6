package com.redbox.domain.user.service;

import com.redbox.domain.auth.dto.CustomUserDetails;
import com.redbox.domain.user.dto.SignupRequest;
import com.redbox.domain.user.dto.SignupResponse;
import com.redbox.domain.user.dto.ValidateVerificationCodeRequest;
import com.redbox.domain.user.dto.VerificationCodeRequest;
import com.redbox.domain.user.entity.User;
import com.redbox.domain.user.exception.DuplicateEmailException;
import com.redbox.domain.user.exception.EmailNotVerifiedException;
import com.redbox.domain.user.repository.EmailVerificationCodeRepository;
import com.redbox.domain.user.repository.UserRepository;
import com.redbox.global.util.RandomCodeGenerator;
import com.redbox.global.util.email.EmailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
@RequiredArgsConstructor
public class UserService {

    private final SpringTemplateEngine templateEngine;
    private final EmailSender emailSender;
    private final EmailVerificationCodeRepository emailVerificationCodeRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    // 현재 로그인한 사용자 정보 조회
    public User getCurrentUser() {
        CustomUserDetails userDetails = getCustomUserDetails();
        return userDetails.getUser();
    }

    // ID만 필요한 경우를 위한 메서드
    public Long getCurrentUserId() {
        CustomUserDetails userDetails = getCustomUserDetails();
        return userDetails.getUserId();
    }

    private static CustomUserDetails getCustomUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (CustomUserDetails) authentication.getPrincipal();
    }

    private String createAuthCodeEmailContent(String verificationCode) {
        Context context = new Context();
        context.setVariable("verificationCode", verificationCode);
        return templateEngine.process("verification-code-email", context);
    }

    public void sendVerificationCode(VerificationCodeRequest request) {
        // 이미 회원가입이 된 이메일인지 확인
        if (isDuplicatedEmail(request.getEmail())) {
            throw new DuplicateEmailException();
        }
        String verificationCode = RandomCodeGenerator.generateRandomCode();
        String subject = "[Redbox] 이메일 인증 코드입니다.";
        String content = createAuthCodeEmailContent(verificationCode);
        emailSender.sendMail(request.getEmail(), subject, content);
        emailVerificationCodeRepository.save(request.getEmail(), verificationCode);
    }

    private boolean isDuplicatedEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional
    public boolean validateVerificationCode(ValidateVerificationCodeRequest request) {
        return emailVerificationCodeRepository.getVerificationCodeByEmail(request.getEmail())
                .filter(verificationCode -> verificationCode.equals(request.getVerificationCode()))
                .map(verificationCode -> {
                    emailVerificationCodeRepository.deleteByEmail(request.getEmail());
                    return Boolean.TRUE;
                })
                .orElse(Boolean.FALSE);
    }

    @Transactional
    public SignupResponse signup(SignupRequest request) {
        // 이메일 인증이 완료되었는지 확인
        if (!request.isVerified()) {
            throw new EmailNotVerifiedException();
        }

        // 이미 회원가입이 된 이메일인지 확인
        if (isDuplicatedEmail(request.getEmail())) {
            throw new DuplicateEmailException();
        }

        String encodedPassword = encodePassword(request.getPassword());
        User user = SignupRequest.toEntity(request, encodedPassword);
        // 처음 회원가입 시 인증된 상태가 아니므로 직접 설정
        user.setCreatedBy(request.getEmail());
        user.setUpdatedBy(request.getEmail());

        userRepository.save(user);
        return new SignupResponse(user.getEmail(), user.getName());
    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }
}
