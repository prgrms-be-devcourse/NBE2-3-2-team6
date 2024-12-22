package com.redbox.domain.notice.entity;

import com.redbox.domain.attach.entity.AttachFile;
import com.redbox.domain.attach.exception.NullAttachFileException;
import com.redbox.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Table(name = "notices")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Long id;

    private Long userId;
    private String noticeTitle;

    @Lob
    private String noticeContent;

    private int noticeHits;

    @OneToMany(mappedBy = "notice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AttachFile> attachFiles = new ArrayList<>();

    // 연관관계 편의 메서드
    // 비즈니스 로직 상 글 기준으로 움직이기 때문에 여기에 선언
    public void addAttachFiles(AttachFile attachFile) {
        checkNullAttachFile(attachFile);
        if (isDuplicateAttachFile(attachFile)) return;

        this.attachFiles.add(attachFile);
        attachFile.setNotice(this);
    }

    public void removeAttachFiles(AttachFile attachFile) {
        checkNullAttachFile(attachFile);
        if (isDuplicateAttachFile(attachFile)) return;

        this.attachFiles.remove(attachFile);
        attachFile.setNotice(null);
    }

    private void checkNullAttachFile(AttachFile attachFile) {
        if (attachFile == null) {
            throw new NullAttachFileException();
        }
    }

    private boolean isDuplicateAttachFile(AttachFile attachFile) {
        return this.attachFiles.contains(attachFile);
    }
}
