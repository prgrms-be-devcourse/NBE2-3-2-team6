package com.redbox.domain.user.controller;

import com.redbox.domain.user.dto.*;
import com.redbox.domain.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/auth/email/verification-code")
    public ResponseEntity<Void> sendVerificationCode(@RequestBody @Valid VerificationCodeRequest request) {
        userService.sendVerificationCode(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/email/verify-code")
    public ResponseEntity<Void> validateVerificationCode(@RequestBody @Valid ValidateVerificationCodeRequest request) {
        boolean isValid = userService.validateVerificationCode(request);
        if (isValid) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<SignupResponse> signup(@RequestBody @Valid SignupRequest request) {
        SignupResponse response = userService.signup(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/auth/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody @Valid ResetPasswordRequest request) {
        userService.resetPassword(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/find-id")
    public ResponseEntity<FindIdResponse> findUserId(@RequestBody @Valid FindIdRequest request) {
        // 요청 객체를 그대로 서비스에 넘김
        FindIdResponse response = userService.findUserId(request);
        return ResponseEntity.ok(response);
    }

}
