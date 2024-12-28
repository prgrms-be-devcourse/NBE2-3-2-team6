package com.redbox.domain.request.dto;

import com.redbox.domain.request.entity.RequestStatus;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class RequestFilter {
    private int page;
    private int size;
    private RequestStatus requestStatus;
    private Filter option;
    private LocalDate startDate;
    private LocalDate endDate;
}
