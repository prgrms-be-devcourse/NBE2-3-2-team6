package com.redbox.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // 회원 가입 관련
    EMAIL_NOT_VERIFIED(HttpStatus.BAD_REQUEST, "이메일 인증이 완료되지 않았습니다."),

    // Email 관련 에러
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "이미 가입된 이메일입니다."),
    EMAIL_CREATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 메시지 생성 중 오류가 발생했습니다."),
    EMAIL_SEND_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 전송 중 오류가 발생했습니다."),

    // 비밀번호 관련 에러
    EMPTY_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호는 비어있을 수 없습니다."),

    // 사용자 없음 에러
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 사용자를 찾을 수 없습니다."),

    // 사용자 정보가 잘못된 경우
    INVALID_USER_INFO(HttpStatus.BAD_REQUEST, "사용자 이름과 전화번호를 모두 입력해야 합니다.");

    private final HttpStatus status;
    private final String message;
}
