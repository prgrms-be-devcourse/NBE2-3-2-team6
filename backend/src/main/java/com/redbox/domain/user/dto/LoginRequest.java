package com.redbox.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    private String email; // 이메일 기반으로 로그인
    private String password;
}
