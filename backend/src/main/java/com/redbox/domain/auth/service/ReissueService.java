package com.redbox.domain.auth.service;

import com.redbox.domain.auth.entity.RefreshEntity;
import com.redbox.domain.auth.util.JWTUtil;
import com.redbox.domain.auth.repository.RefreshRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class ReissueService {

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

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
        refreshRepository.deleteByRefresh(refreshToken);
        addRefreshEntity(email, newRefreshToken, 86_400_000L);

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

        if (!refreshRepository.existsByRefresh(refreshToken)) {
            throw new IllegalArgumentException("Refresh token does not exist");
        }
    }

    private void addRefreshEntity(String email, String refreshToken, Long expirationMs) {
        RefreshEntity refreshEntity = new RefreshEntity();
        refreshEntity.setEmail(email);
        refreshEntity.setRefresh(refreshToken);
        refreshEntity.setExpiration(new Date(System.currentTimeMillis() + expirationMs).toString());

        refreshRepository.save(refreshEntity);
    }
}
