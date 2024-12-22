package com.redbox.domain.auth.dto;

import com.redbox.domain.user.entity.Status;
import com.redbox.domain.user.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final User user;

    // User 객체를 생성자로 주입받음
    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        // RoleType의 이름을 "ROLE_" 접두사가 포함된 권한으로 설정
        authorities.add(() -> "ROLE_" + user.getRoleType().name());
        return authorities;
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
}
