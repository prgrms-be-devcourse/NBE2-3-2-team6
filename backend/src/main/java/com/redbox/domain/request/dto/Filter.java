package com.redbox.domain.request.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Filter {
    TOTAL("전체글"), LIKED("관심");
    private final String filter;
}
