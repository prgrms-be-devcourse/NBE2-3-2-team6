package com.redbox.domain.attach.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Category {

    REQUEST("요청게시판"), NOTICE("공지사항");

    private final String text;
}
