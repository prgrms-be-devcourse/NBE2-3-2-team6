package com.redbox.domain.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redbox.domain.auth.util.JWTUtil;
import com.redbox.domain.auth.service.RefreshTokenService;
import com.redbox.global.exception.BusinessException;
import com.redbox.global.exception.ErrorCode;
import com.redbox.global.exception.ErrorResponse;
import com.redbox.global.util.error.ErrorResponseUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class CustomLogoutFilter extends GenericFilterBean {

    private final JWTUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    public CustomLogoutFilter(JWTUtil jwtUtil, RefreshTokenService refreshTokenService) {
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        try {
            // 요청 URI와 메소드 검증
            String requestUri = request.getRequestURI();
            String requestMethod = request.getMethod();

            if (!requestUri.matches("^\\/auth\\/logout$") || !requestMethod.equals("POST")) {
                filterChain.doFilter(request, response);
                return;
            }

            // Refresh 토큰 추출
            String refresh = extractRefreshToken(request);

            // Refresh 토큰 검증
            jwtUtil.isExpired(refresh);

            // 토큰의 카테고리 확인
            String category = jwtUtil.getCategory(refresh);
            if (!category.equals("refresh")) {
                throw new BusinessException(ErrorCode.INVALID_TOKEN);
            }

            // Redis에서 Refresh 토큰 존재 여부 확인
            if (!refreshTokenService.existsByRefreshToken(refresh)) {
                throw new BusinessException(ErrorCode.TOKEN_NOT_FOUND);
            }

            // 로그아웃 처리: 토큰 삭제 및 쿠키 무효화
            String email = refreshTokenService.getEmailByRefreshToken(refresh);
            refreshTokenService.deleteRefreshToken(email);
            invalidateCookie(response, "refresh");
            response.setStatus(HttpServletResponse.SC_OK);

        } catch (BusinessException e) {
            ErrorResponseUtil.handleException(response, e.getErrorCodes());
        } catch (ExpiredJwtException e) {
            ErrorResponseUtil.handleException(response, ErrorCode.EXPIRED_TOKEN);
        } catch (Exception e) {
            ErrorResponseUtil.handleException(response, ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    // Refresh 토큰 추출
    private String extractRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        throw new BusinessException(ErrorCode.TOKEN_NOT_FOUND);
    }

    // 쿠키 무효화 처리
    private void invalidateCookie(HttpServletResponse response, String cookieName) {
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
    }
}
