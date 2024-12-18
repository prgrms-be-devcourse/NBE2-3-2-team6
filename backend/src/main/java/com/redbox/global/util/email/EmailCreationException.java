package com.redbox.global.util.email;

import com.redbox.global.exception.BusinessException;
import com.redbox.global.exception.ErrorCode;

public class EmailCreationException extends BusinessException {
    protected EmailCreationException() {
        super(ErrorCode.EMAIL_CREATION_FAILED);
    }
}
