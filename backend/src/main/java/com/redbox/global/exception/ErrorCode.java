package com.redbox.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // 공지사항 관련
    FAIL_TO_FIND_NOTICE(HttpStatus.NOT_FOUND,"해당 공지사항을 찾을 수 없습니다."),

    // 첨부파일 관련
    INVALID_ATTACHFILE(HttpStatus.BAD_REQUEST, "첨부파일이 비어있습니다."),
    FAIL_TO_FIND_ATTACHFILE(HttpStatus.NOT_FOUND,"첨부파일을 찾을 수 없습니다."),
    NOT_BELONG_TO_FILE(HttpStatus.BAD_REQUEST, "파일이 해당 게시글에 속하지 않습니다"),

    // 헌혈 기사 관련
    FAIL_TO_FIND_ARTICLE(HttpStatus.NOT_FOUND,"해당 기사를 찾을 수 없습니다."),

    // 회원 가입 관련
    UNVERIFIED_EMAIL(HttpStatus.BAD_REQUEST, "이메일 인증이 완료되지 않았습니다."),

    // Email 관련 에러
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "이미 가입된 이메일입니다."),
    FAIL_TO_CREATE_EMAIL(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 메시지 생성 중 오류가 발생했습니다."),
    FAIL_TO_SEND_EMAIL(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 전송 중 오류가 발생했습니다."),
    EMAIL_CREATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 메시지 생성 중 오류가 발생했습니다."),
    EMAIL_SEND_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 전송 중 오류가 발생했습니다."),

    // 비밀번호 관련 에러
    EMPTY_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호는 비어있을 수 없습니다."),
    NOT_MATCH_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호와 비밀번호 확인이 일치하지 않습니다."),

    // 사용자 없음 에러
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 사용자를 찾을 수 없습니다."),

    // 사용자 정보가 잘못된 경우
    INVALID_USER_INFO(HttpStatus.BAD_REQUEST, "사용자 이름과 전화번호를 모두 입력해야 합니다."),
  
    // 로그인 관련
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 잘못되었습니다."),
    EMAIL_OR_PASSWORD_MISSING(HttpStatus.BAD_REQUEST, "이메일 또는 비밀번호가 누락되었습니다."),
    AUTHENTICATION_FAILED(HttpStatus.UNAUTHORIZED, "인증에 실패했습니다."),

    // 토큰
    TOKEN_NOT_FOUND(HttpStatus.BAD_REQUEST, "Refresh 토큰이 존재하지 않습니다."),
    INVALID_TOKEN(HttpStatus.BAD_REQUEST, "유효하지 않은 토큰입니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류가 발생했습니다.");

    private final HttpStatus status;
    private final String message;
}
