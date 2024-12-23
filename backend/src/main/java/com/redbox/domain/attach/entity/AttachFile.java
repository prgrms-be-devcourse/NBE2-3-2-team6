package com.redbox.domain.attach.entity;

import com.redbox.domain.notice.entity.Notice;
import com.redbox.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "attach_files")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AttachFile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attach_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private Category category;

    // 아직 request 와 merge 하기 전
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "request_id")
//    private Request request;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notice_id")
    private Notice notice;

    private String originalFilename;
    private String newFilename;
    private String fileUrl;

    @Builder
    public AttachFile(Category category, Notice notice, String originalFilename, String newFilename, String fileUrl) {
        this.category = category;
        this.notice = notice;
        this.originalFilename = originalFilename;
        this.newFilename = newFilename;
        this.fileUrl = fileUrl;
    }

    // 연관 관계 편의 메서드를 위한 setter 메서드
    @SuppressWarnings("lombok")
    public void setNotice(Notice notice) {
        this.notice = notice;
    }
}
