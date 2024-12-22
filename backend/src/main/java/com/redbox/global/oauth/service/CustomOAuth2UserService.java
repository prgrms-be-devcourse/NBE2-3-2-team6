package com.redbox.global.oauth.service;

import com.redbox.global.oauth.dto.NaverResponse;
import com.redbox.global.oauth.dto.Oauth2Response;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println(oAuth2User.getAuthorities());

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Oauth2Response oauth2Response = null;

        if (registrationId.equals("naver")) {
            oauth2Response = new NaverResponse(oAuth2User.getAttributes());
        }
        // 소셜 종류에 따른 분기 처리
//        if (registrationId.equals("google")) {
//        }

        return super.loadUser(userRequest);
    }
}
