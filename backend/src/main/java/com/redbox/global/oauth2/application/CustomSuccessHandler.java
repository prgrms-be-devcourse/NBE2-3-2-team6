package com.redbox.global.oauth2.application;

import com.redbox.domain.auth.service.RefreshTokenService;
import com.redbox.domain.auth.util.JWTUtil;
import com.redbox.global.oauth2.dto.CustomOAuth2User;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    public CustomSuccessHandler(JWTUtil jwtUtil, RefreshTokenService refreshTokenService) {
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {

        //OAuth2User
        System.out.println("her?");
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        long userId = customUserDetails.getUserId();
        String email = customUserDetails.getEmail();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String access = jwtUtil.createJwt("access", userId, email, role, 600000L); // 10분
        String refresh = jwtUtil.createJwt("refresh", userId, email, role, 86400000L); // 1일

        // Refresh 토큰 저장
        refreshTokenService.saveRefreshToken(email, refresh, 86400000L); // 변경: 서비스 사용
        System.out.println(">>>>>>>>> login 성공 토큰도 만듬 !!! <<<<<<<<<");
        response.addCookie(createCookie("access", access));
        response.addCookie(createCookie("refresh", refresh));
        response.sendRedirect("http://localhost:5173/");
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
//        cookie.setPath("/");
        cookie.setMaxAge(60*60*60);
        cookie.setHttpOnly(true);

        return cookie;
    }
}
