package com.redbox.domain.notice.dto;

import com.redbox.domain.attach.entity.AttachFile;
import com.redbox.domain.notice.entity.Notice;
import com.redbox.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
        private final Long fileNo;
        private final String originFilename;
        private final String filename;

        public AttachFileResponse(AttachFile file) {
            this.fileNo = file.getId();
            this.originFilename = file.getOriginalFilename();
            this.filename = file.getNewFilename();
        }
    }

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
