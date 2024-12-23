package com.redbox.global.oauth.dto;

import com.redbox.domain.user.entity.RoleType;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
public class CustomOAuth2User implements OAuth2User {

    private final Oauth2Response oAuth2Response;
    private final RoleType role;

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return role.name();
            }
        });

        return authorities;
    }

    @Override
    public String getName() {
        return oAuth2Response.getName();
    }

    // 유니크한 id 생성
    public String getUsername() {
        return oAuth2Response.getProvider() + " " + oAuth2Response.getName();
    }
}
