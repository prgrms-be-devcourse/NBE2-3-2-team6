package com.redbox.domain.notice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
public class NoticeResponse {

    private Long noticeNo;
    private String title;
    private String content;
    private LocalDate createdDate;
    private String writer;
    private int views;
    private List<AttachFileResponse> attachFileResponses;

    @Getter
    private static class AttachFileResponse {
        private String filename;
    }
}
