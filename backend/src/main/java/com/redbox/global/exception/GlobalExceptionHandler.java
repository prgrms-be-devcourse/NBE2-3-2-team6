package com.redbox.global.exception;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 비즈니스 관련 예러 처리
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(BusinessException e) {
        ErrorCode error = e.getErrorCodes();
        return ResponseEntity
                .status(error.getStatus())
                .body(new ErrorResponse(error.getMessage(), error.getStatus().toString()));
    }

    // 인증 관련 예외 처리
    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ErrorResponse> handleAuthException(AuthException e) {
        ErrorCode error = e.getErrorCode();
        return ResponseEntity
                .status(error.getStatus())
                .body(new ErrorResponse(error.getMessage(), error.getStatus().toString()));
    }

    // DB 관련 예외 처리
    @ExceptionHandler(DataAccessException.class)
    protected ResponseEntity<ErrorResponse> handleDataAccessException(DataAccessException e) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("데이터베이스 오류가 발생했습니다."
                        , HttpStatus.INTERNAL_SERVER_ERROR.toString()));
    }

    // @Valid 검증 실패 시 처리
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult()
                .getFieldErrors()
                .get(0)
                .getDefaultMessage();

        ErrorResponse response = new ErrorResponse(message, HttpStatus.BAD_REQUEST.toString());
        return ResponseEntity.badRequest().body(response);
    }

    // JSON 파싱 실패 시 (잘못된 데이터 형식) 처리
    // enum 값이 잘못된 경우
    // 날짜 형식이 잘못된 경우
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
        String message = "잘못된 형식의 요청입니다.";

        ErrorResponse response = new ErrorResponse(message, HttpStatus.BAD_REQUEST.toString());
        return ResponseEntity.badRequest().body(response);
    }
}
