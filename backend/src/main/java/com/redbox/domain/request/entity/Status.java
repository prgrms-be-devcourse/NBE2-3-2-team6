package com.redbox.domain.request.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Status {
    Request("요청"), Approve("승인"), Reject("거절");
    private final String text;
}
