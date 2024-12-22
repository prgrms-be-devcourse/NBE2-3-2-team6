package com.redbox.domain.request.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Priority {

    HIGH("상"),Medium("중"),Low("하");
    private final String text;

}
