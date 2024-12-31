package com.redbox.domain.notice.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class RecentNoticeResponse {

    private Long noticeNo;
    private String title;
    private LocalDate createdDate;

    public RecentNoticeResponse(Long noticeNo, String title, LocalDate createdDate) {
        this.noticeNo = noticeNo;
        this.title = title;
        this.createdDate = createdDate;
    }
}
