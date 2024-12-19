package com.redbox.domain.user.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoleType {

    ADMIN("관리자"), USER("일반 사용자");

    private final String text;
}
