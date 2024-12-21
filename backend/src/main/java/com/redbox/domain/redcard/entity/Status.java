package com.redbox.domain.redcard.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Status {

    USED("사용 완료"), AVAILABLE("사용 가능");

    private final String text;
}