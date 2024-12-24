package com.redbox.domain.auth.controller;

import com.redbox.domain.auth.exception.ExpiredRefreshTokenException;
import com.redbox.domain.auth.exception.RefreshTokenNotFoundException;
import com.redbox.domain.auth.exception.TokenReissueFailedException;
import com.redbox.domain.auth.service.ReissueService;
import com.redbox.global.exception.AuthException;
import com.redbox.global.util.error.ErrorResponseUtil;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth") // /auth 경로로 공통 매핑
public class ReissueController {

    private final ReissueService reissueService;

    // 토큰 갱신
    @PostMapping("/reissue") // /auth/reissue 경로로 매핑
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        try {
            // Refresh 토큰 가져오기
            String refreshToken = extractRefreshTokenFromCookie(request);

            if (refreshToken == null) {
                throw new RefreshTokenNotFoundException(); // 커스텀 예외 사용
            }

            // 토큰 재발급
            String newAccessToken = reissueService.reissueAccessToken(refreshToken);
            String newRefreshToken = reissueService.reissueRefreshToken(refreshToken);

            // 응답에 토큰 추가
            response.setHeader("access", newAccessToken);
            response.addCookie(createCookie("refresh", newRefreshToken));

            return ResponseEntity.ok().build();

        } catch (AuthException e) {
            return ErrorResponseUtil.createErrorResponse(e.getErrorCode());
        } catch (ExpiredJwtException e) {
            throw new ExpiredRefreshTokenException();
        } catch (Exception e) {
            throw new TokenReissueFailedException();
        }
    }

    private String extractRefreshTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        throw new RefreshTokenNotFoundException(); // 커스텀 예외 사용
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }
}
