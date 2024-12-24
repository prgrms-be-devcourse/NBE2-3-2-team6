package com.redbox.domain.auth.service;

import com.redbox.domain.auth.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReissueService {

    private final JWTUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    public String reissueAccessToken(String refreshToken) {
        validateRefreshToken(refreshToken);

        String email = jwtUtil.getEmail(refreshToken);
        String role = jwtUtil.getRole(refreshToken);

        return jwtUtil.createJwt("access", email, role, 600_000L); // 10분
    }

    public String reissueRefreshToken(String refreshToken) {
        validateRefreshToken(refreshToken);

        String email = jwtUtil.getEmail(refreshToken);
        String role = jwtUtil.getRole(refreshToken);

        String newRefreshToken = jwtUtil.createJwt("refresh", email, role, 86_400_000L); // 1일
        refreshTokenService.deleteRefreshToken(refreshToken); // 기존 토큰 삭제
        refreshTokenService.saveRefreshToken(email, newRefreshToken, 86_400_000L); // 새 토큰 저장

        return newRefreshToken;
    }

    private void validateRefreshToken(String refreshToken) {
        if (refreshToken == null) {
            throw new IllegalArgumentException("Refresh token is missing");
        }

        if (jwtUtil.isExpired(refreshToken)) {
            throw new IllegalArgumentException("Refresh token has expired");
        }

        if (!"refresh".equals(jwtUtil.getCategory(refreshToken))) {
            throw new IllegalArgumentException("Invalid refresh token category");
        }

        // 존재 여부 확인
        if (!refreshTokenService.existsByRefreshToken(refreshToken)) { // Redis에서 확인
            throw new IllegalArgumentException("Refresh token does not exist");
        }
    }
}
