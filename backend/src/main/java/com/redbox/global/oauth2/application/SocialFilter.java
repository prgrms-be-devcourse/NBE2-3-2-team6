package com.redbox.global.oauth2.application;

import com.redbox.domain.auth.dto.CustomUserDetails;
import com.redbox.domain.auth.util.JWTUtil;
import com.redbox.domain.user.entity.RoleType;
import com.redbox.domain.user.entity.User;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class SocialFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public SocialFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authorization = null;

        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {

            System.out.println(cookie.getName());
            if(cookie.getName().equals("access")){
                filterChain.doFilter(request, response);

                // 조건
                return;
            }

            String token = authorization;

            if (jwtUtil.isExpired(token)) {
                System.out.println("token is expired");
                filterChain.doFilter(request, response);

                return;
            }

            Long userId = jwtUtil.getUserId(token);
            String email = jwtUtil.getEmail(token);
            String role = jwtUtil.getRole(token);

            role = role.replace("ROLE_", "");

            User user = User.builder()
                            .id(userId)
                            .email(email)
                            .roleType(RoleType.valueOf(role)) // RoleType 설정
                            .build();

            CustomUserDetails customUserDetails = new CustomUserDetails(user);

            Authentication authToken = new UsernamePasswordAuthenticationToken(
                    customUserDetails, null, customUserDetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authToken);

            // 다음 필터로 전달
            filterChain.doFilter(request, response);
        }
    }
}
