package com.redbox.global.config;


import com.redbox.global.oauth2.repository.CustomClientRegistrationRepo;
import com.redbox.global.oauth2.service.CustomOAuth2UserService;

import com.redbox.domain.auth.filter.CustomLogoutFilter;
import com.redbox.domain.auth.filter.JWTFilter;
import com.redbox.domain.auth.service.RefreshTokenService;
import com.redbox.domain.auth.util.JWTUtil;
import com.redbox.domain.auth.filter.LoginFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.AllArgsConstructor;

import java.util.List;

@Configuration
@EnableWebSecurity
@Profile("!test")
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
    private final RefreshTokenService refreshTokenService; // 변경: RefreshTokenService 주입
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomClientRegistrationRepo customClientRegistrationRepo;

    public SecurityConfig(CustomOAuth2UserService customOAuth2UserService, CustomClientRegistrationRepo customClientRegistrationRepo, AuthenticationConfiguration authenticationConfiguration, JWTUtil jwtUtil, RefreshTokenService refreshTokenService) {
        this.customOAuth2UserService = customOAuth2UserService;
        this.customClientRegistrationRepo = customClientRegistrationRepo;
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService; // 주입
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // API 서버이므로
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/**").permitAll()
                    // .requestMatchers("/community/request/write").permitAll()
                    // 헌혈기사 목록 조회만 엔드포인트 허용
                    //.requestMatchers(HttpMethod.GET, "/articles").permitAll()
                    //.anyRequest().authenticated()
                        // 회원가입, 이메일, 로그인 관련 엔드포인트 허용
                        .requestMatchers("/auth/**").permitAll()
                        // 헌혈기사 목록 조회만 엔드포인트 허용
                        .requestMatchers(HttpMethod.GET, "/articles").permitAll()
                        .requestMatchers(HttpMethod.GET, "/redbox/stats").permitAll()
                        .requestMatchers(HttpMethod.GET, "/users/my-donation-stats").authenticated()
                        // 요청 게시판 목록 조회만 엔드 포인트 허용
                        .requestMatchers(HttpMethod.GET, "/requests/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/write/requests").authenticated()
                        .requestMatchers(HttpMethod.POST, "/requests/**").authenticated()
                        // 관리자 목록 확인
                        .requestMatchers("/admin/**").permitAll()
                        .anyRequest().authenticated()

                )
                // 인증 플로우 수정
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil, refreshTokenService), UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(new JWTFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(new CustomLogoutFilter(jwtUtil, refreshTokenService), JWTFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(cors -> cors.configurationSource(corsConfigurationSource()));

        http.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "*"));
        configuration.setExposedHeaders(List.of("access", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
