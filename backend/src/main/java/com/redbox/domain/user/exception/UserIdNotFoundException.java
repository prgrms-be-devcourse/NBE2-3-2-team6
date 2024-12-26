package com.redbox.domain.user.exception;

import com.redbox.global.exception.BusinessException;
import com.redbox.global.exception.ErrorCode;

public class UserIdNotFoundException extends BusinessException {
    public UserIdNotFoundException() {
        super(ErrorCode.USER_ID_NOT_FOUND); // 에러코드 활용
    }
}
