package com.redbox.global.oauth.dto;

public interface Oauth2Response {
    // 제공자
    String getProvider();
    // api 소셜 서비스에서 발급해주는 id
    String getProviderId();
    String getEmail();
    // 사용자가 소셜 서비스에서 설정한 이름
    String getName();
}
