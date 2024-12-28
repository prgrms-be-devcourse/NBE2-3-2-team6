package com.redbox.domain.user.service;

import com.redbox.domain.user.dto.*;
import com.redbox.domain.user.entity.User;
import com.redbox.domain.user.exception.DuplicateEmailException;
import com.redbox.domain.user.exception.EmailNotVerifiedException;
import com.redbox.domain.user.exception.InvalidUserInfoException;
import com.redbox.domain.user.exception.UserNotFoundException;
import com.redbox.domain.user.repository.EmailVerificationCodeRepository;
import com.redbox.domain.user.repository.UserRepository;
import com.redbox.global.util.RandomCodeGenerator;
import com.redbox.global.util.email.EmailSender;
import lombok.RequiredArgsConstructor;
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

    private String createEmailContent(String templateName, String variableName, String variableValue) {
        Context context = new Context();
        context.setVariable(variableName, variableValue);
        return templateEngine.process(templateName, context);
    }

    public void sendVerificationCode(VerificationCodeRequest request) {
        // 이미 회원가입이 된 이메일인지 확인
        if (isDuplicatedEmail(request.getEmail())) {
            throw new DuplicateEmailException();
        }
        String verificationCode = RandomCodeGenerator.generateRandomCode();
        String subject = "[Redbox] 이메일 인증 코드입니다.";
        String content = createEmailContent("verification-code-email", "verificationCode", verificationCode);
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

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        // 사용자 조회
        User user = userRepository.findByEmailAndName(request.getEmail(), request.getUsername())
                .orElseThrow(UserNotFoundException::new);

        // 임시 비밀번호 생성
        String tempPassword = RandomCodeGenerator.generateRandomCode();
        String encodedPassword = encodePassword(tempPassword);
        System.out.println("Generated temporary password: " + tempPassword);

        // 비밀번호 변경
        user.changePassword(encodedPassword);
        userRepository.save(user);

        // 이메일 전송
        String subject = "[Redbox] 임시 비밀번호 안내";
        String content = createEmailContent("temp-password-email", "tempPassword", tempPassword);
        emailSender.sendMail(request.getEmail(), subject, content);
    }

    public FindIdResponse findUserId(FindIdRequest request) {
        String name = request.getUserName();
        String phoneNumber = request.getPhoneNumber();

        // 사용자 이름과 전화번호가 올바르게 입력되었는지 확인
        if (name == null || phoneNumber == null || name.trim().isEmpty() || phoneNumber.trim().isEmpty()) {
            throw new InvalidUserInfoException(); // 잘못된 사용자 정보 처리
        }

        // 해당 정보로 사용자를 찾고, 없으면 예외 던짐
        String email = userRepository.findByNameAndPhoneNumber(name, phoneNumber)
                .orElseThrow(UserNotFoundException::new) // 해당 정보로 가입된 사용자가 없으면 예외 던짐
                .getEmail();

        // 이메일을 담은 응답 객체 생성 후 반환
        return new FindIdResponse(email);
    }

}
