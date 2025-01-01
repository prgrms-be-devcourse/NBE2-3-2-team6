package com.redbox.domain.request.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class RequestFilter {
    private int page;
    private int size;
    private Filter sort;
    private Filter option;
    private LocalDate startDate;
    private LocalDate endDate;
}
