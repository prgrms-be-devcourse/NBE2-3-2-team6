package com.redbox.domain.auth.dto;

import com.redbox.domain.user.entity.Status;
import com.redbox.domain.user.entity.User;
import com.redbox.global.oauth2.dto.SocialUserDTO;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Getter
public class CustomUserDetails implements UserDetails, OAuth2User {

    private final User user;

    // User 객체를 생성자로 주입받음
    public CustomUserDetails(User user) {
        this.user = user;
    }

    public Long getUserId() {
        return user.getId();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(user.getRoleType().getFullRole()));
    }

    @Override
    public String getPassword() {
        return user.getPassword(); // 비밀번호 반환
    }

    @Override
    public String getUsername() {
        return user.getEmail(); // 이메일 반환
    }

    @Override
    public boolean isAccountNonExpired() {
        // 계정이 만료되지 않음을 항상 true로 설정
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // 계정이 잠금되지 않음을 항상 true로 설정
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // 자격 증명이 만료되지 않음을 항상 true로 설정
        return true;
    }

    @Override
    public boolean isEnabled() {
        // 계정이 활성 상태인지 확인
        return user.getStatus() == Status.ACTIVE;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public String getName() {
        return user.getName();
    }
}
