package com.redbox.global.exception;

import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {

    private final ErrorCode errorCodes;

    public BusinessException(ErrorCode errorCodes) {
        super(errorCodes.getMessage());
        this.errorCodes = errorCodes;
    }

    public BusinessException(ErrorCode errorCodes, Throwable cause) {
        super(errorCodes.getMessage(), cause);
        this.errorCodes = errorCodes;
    }
}
