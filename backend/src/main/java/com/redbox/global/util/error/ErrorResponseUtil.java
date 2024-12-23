package com.redbox.global.util.error;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redbox.global.exception.BusinessException;
import com.redbox.global.exception.ErrorCode;
import com.redbox.global.exception.ErrorResponse;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class ErrorResponseUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void handleAuthenticationError(HttpServletResponse response, Exception exception) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        ErrorResponse errorResponse;

        if (exception.getCause() instanceof BusinessException) {
            // BusinessException 처리
            BusinessException businessException = (BusinessException) exception.getCause();
            ErrorCode errorCode = businessException.getErrorCodes();

            errorResponse = new ErrorResponse(errorCode.getMessage(), errorCode.name());
        } else {
            // 기본 인증 실패 처리
            errorResponse = new ErrorResponse("Authentication failed", "UNAUTHORIZED");
        }

        String jsonResponse = objectMapper.writeValueAsString(errorResponse);
        response.getWriter().write(jsonResponse);
    }
}
