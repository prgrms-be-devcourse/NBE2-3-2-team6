package com.redbox.global.util.email;

import com.redbox.global.exception.BusinessException;
import com.redbox.global.exception.ErrorCode;

public class EmailSendException extends BusinessException {
    protected EmailSendException() {
        super(ErrorCode.EMAIL_SEND_FAILED);
    }
}
