package com.redbox.domain.auth.filter;

import com.redbox.domain.auth.util.JWTUtil;
import com.redbox.domain.auth.repository.RefreshRepository;
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
    private final RefreshRepository refreshRepository;

    public CustomLogoutFilter(JWTUtil jwtUtil, RefreshRepository refreshRepository) {
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        // Path and method verify
        String requestUri = request.getRequestURI();
        String requestMethod = request.getMethod();
        System.out.println("[LogoutFilter] Request URI: " + requestUri);
        System.out.println("[LogoutFilter] Request Method: " + requestMethod);

        if (!requestUri.matches("^\\/logout$")) {
            System.out.println("[LogoutFilter] Not a logout endpoint. Passing to next filter.");
            filterChain.doFilter(request, response);
            return;
        }

        if (!requestMethod.equals("POST")) {
            System.out.println("[LogoutFilter] Not a POST request. Passing to next filter.");
            filterChain.doFilter(request, response);
            return;
        }

        // Refresh token extraction
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh")) {
                    refresh = cookie.getValue();
                    break;
                }
            }
        }

        if (refresh == null) {
            System.out.println("[LogoutFilter] No refresh token found in cookies.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        System.out.println("[LogoutFilter] Extracted Refresh Token: " + refresh);

        // Refresh token validation
        try {
            jwtUtil.isExpired(refresh);
            System.out.println("[LogoutFilter] Refresh token is valid.");
        } catch (ExpiredJwtException e) {
            System.out.println("[LogoutFilter] Refresh token is expired.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // Verify if token category is "refresh"
        String category = jwtUtil.getCategory(refresh);
        System.out.println("[LogoutFilter] Token category: " + category);
        if (!category.equals("refresh")) {
            System.out.println("[LogoutFilter] Invalid token category.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // Check if refresh token exists in DB
        Boolean isExist = refreshRepository.existsByRefresh(refresh);
        if (!isExist) {
            System.out.println("[LogoutFilter] Refresh token not found in database.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // Perform logout: Remove token from DB and invalidate cookie
        refreshRepository.deleteByRefresh(refresh);
        System.out.println("[LogoutFilter] Refresh token removed from database.");

        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);
        System.out.println("[LogoutFilter] Logout successful. Refresh token invalidated.");
    }
}
