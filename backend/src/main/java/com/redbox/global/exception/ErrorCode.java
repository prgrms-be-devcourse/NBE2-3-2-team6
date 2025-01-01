package com.redbox.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // 요청 게시판 관련
    FAIL_TO_FIND_REQUEST(HttpStatus.NOT_FOUND,"해당 게시판을 찾을 수 없습니다."),

    // 현재 로그인한 회원 찾기
    FAIL_TO_FIND_USER(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다"),

    // 회원 가입 관련
    EMAIL_NOT_VERIFIED(HttpStatus.BAD_REQUEST, "이메일 인증이 완료되지 않았습니다."),

    // Email 관련 에러
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "이미 가입된 이메일입니다."),
    EMAIL_CREATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 메시지 생성 중 오류가 발생했습니다."),
    EMAIL_SEND_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 전송 중 오류가 발생했습니다."),

    // 수정 권한 확인
    FAIL_TO_ACCESS(HttpStatus.FORBIDDEN, "수정 권한이 없습니다"),

    // 관리자 승인 요청 게시글
    FAIL_TO_APPROVAL_STATUS(HttpStatus.NOT_FOUND, "해당 승인 상태값이 존재하지 않습니다");

    private final HttpStatus status;
    private final String message;
}
