package com.redbox.domain.auth.controller;

import com.redbox.domain.auth.service.ReissueService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
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
                return new ResponseEntity<>("Refresh token is missing", HttpStatus.BAD_REQUEST);
            }

            // 토큰 재발급
            String newAccessToken = reissueService.reissueAccessToken(refreshToken);
            String newRefreshToken = reissueService.reissueRefreshToken(refreshToken);

            // 응답에 토큰 추가
            response.setHeader("access", newAccessToken);
            response.addCookie(createCookie("refresh", newRefreshToken));

            return ResponseEntity.ok().build();

        } catch (ExpiredJwtException e) {
            return new ResponseEntity<>("Refresh token expired", HttpStatus.BAD_REQUEST);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
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
        return null;
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }
}
