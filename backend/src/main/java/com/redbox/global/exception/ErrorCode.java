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
    FAIL_TO_SEND_EMAIL(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 전송 중 오류가 발생했습니다.");

    private final HttpStatus status;
    private final String message;
}
