package com.redbox.global.oauth2;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

// ConfigurationProperties 자동 할당을 위한 Getter, Setter (Java Bean 규약에 따른 명명인 setXX 권장)
@Setter
@Getter
@Component
public class SocialClientRegistration {

    public ClientRegistration naverClientRegistration() {

        return ClientRegistration.withRegistrationId("naver")
                                 .clientId("ebevhEorieZhYIx1CyGc")
                                 .clientSecret("RPEdDRgl7n")
                                 .redirectUri("http://localhost:8080/login/oauth2/code/naver")
                                 .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                                 .scope("name", "email")
                                 .authorizationUri("https://nid.naver.com/oauth2.0/authorize")
                                 .tokenUri("https://nid.naver.com/oauth2.0/token")
                                 .userInfoUri("https://openapi.naver.com/v1/nid/me")
                                 .userNameAttributeName("response")
                                 .build();
    }
}