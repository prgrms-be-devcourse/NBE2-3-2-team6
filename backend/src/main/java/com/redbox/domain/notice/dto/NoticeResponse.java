package com.redbox.domain.notice.dto;

import com.redbox.domain.attach.dto.AttachFileResponse;
import com.redbox.domain.notice.entity.Notice;
import com.redbox.domain.user.entity.User;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Getter
public class NoticeResponse {

    private final Long noticeNo;
    private final String title;
    private final String content;
    private final LocalDate createdDate;
    private final String writer;
    private final int views;
    private final List<AttachFileResponse> attachFileResponses;

    public NoticeResponse(Notice notice) {
        this.noticeNo = notice.getId();
        this.title = notice.getNoticeTitle();
        this.content = notice.getNoticeContent();
        this.createdDate = notice.getCreatedAt().toLocalDate();
        this.writer = Optional.ofNullable(notice.getUser())
                .map(User::getName)
                .orElse("Unknown");
        this.views = notice.getNoticeHits();
        this.attachFileResponses = notice.getAttachFiles()
                .stream().map(AttachFileResponse::new).toList();

    }
}
