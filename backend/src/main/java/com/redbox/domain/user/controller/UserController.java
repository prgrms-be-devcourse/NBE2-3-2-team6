package com.redbox.domain.user.controller;

import com.redbox.domain.user.dto.*;
import com.redbox.domain.redcard.dto.RegisterRedcardRequest;
import com.redbox.domain.redcard.service.RedcardService;
import com.redbox.domain.user.service.UserService;
import com.redbox.global.entity.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final RedcardService redCardService;

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

    //개인적으로 uri 가 조금 적합하지 않은것 같아용 (프론트와 같이 수정 필요)
    @PostMapping("/users/me/redcards")
    public ResponseEntity<Void> registerRedCard(@RequestBody RegisterRedcardRequest request) {
        redCardService.registerRedCard(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/my-info/redcards")
    public ResponseEntity<PageResponse<RedcardResponse>> getRedcards(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int size
    ) {
        return ResponseEntity.ok(redCardService.getRedcards(page, size));
    }
}
