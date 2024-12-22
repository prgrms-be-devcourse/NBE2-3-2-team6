package com.redbox.domain.request.entity;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Status {
    Request("요청"), Approve("승인"), Reject("거절"), EXPIRED("만료"), IN_PROGRESS("진행중");
    private final String text;
}
