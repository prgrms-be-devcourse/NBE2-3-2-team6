package com.redbox.domain.request.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RequestStatus {
    // 모집중 만료 - progress
    // 승인 거절 요청 - status
    REQUEST("요청"), APPROVE("승인"), REJECT("거절"), EXPIRED("만료"), IN_PROGRESS("진행중");
    private final String text;
}
