package com.redbox.domain.notice.dto;

import com.redbox.domain.attach.entity.AttachFile;
import com.redbox.domain.notice.entity.Notice;
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
        private final String filename;

        public AttachFileResponse(AttachFile file) {
            this.filename = file.getNewFilename() +
                    '.' +
                    file.getAttachFileType();
        }
    }

    public NoticeResponse(Notice notice, String writer) {
        this.noticeNo = notice.getId();
        this.title = notice.getNoticeTitle();
        this.content = notice.getNoticeContent();
        this.createdDate = notice.getCreatedAt().toLocalDate();
        this.writer = writer;
        this.views = notice.getNoticeHits();
        this.attachFileResponses = notice.getAttachFiles()
                .stream().map(AttachFileResponse::new).toList();

    }
}
