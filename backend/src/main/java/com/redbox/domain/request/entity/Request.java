package com.redbox.domain.request.entity;

import com.redbox.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "request")
public class Request extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId; // 게시글 아이디

    // TODO : user 관련 부분 수정 필요 (현재는 임의값 설정)
    //@ManyToOne
    //@JoinColumn(name = "user_id", nullable = false)
    //private User user_id; // 외래키(사용자 아이디)

    private Long userId;

    private String requestTitle;
    private String requestContent;
    private int targetAmount;
    private int currentAmount;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDate donationStartDate;
    private LocalDate donationEndDate;

    private String requestAttachFile; // 파일 로컬에 저장

    @Enumerated(EnumType.STRING)
    private Priority priority; // 중요도

    private int requestHits;
    private int requestLikes; // 좋아요 수

    private int fileDownloads;

    @Builder
    public Request(Long userId, String requestTitle, String requestContent, int targetAmount, int currentAmount, Status status, LocalDate donationStartDate, LocalDate donationEndDate, String requestAttachFile, Priority priority, int requestHits, int requestLikes, int fileDownloads) {
        this.userId = userId;
        this.requestTitle = requestTitle;
        this.requestContent = requestContent;
        this.targetAmount = targetAmount;
        this.currentAmount = currentAmount;
        this.status = status;
        this.donationStartDate = donationStartDate;
        this.donationEndDate = donationEndDate;
        this.requestAttachFile = requestAttachFile;
        this.priority = priority;
        this.requestHits = requestHits;
        this.requestLikes = requestLikes;
        this.fileDownloads = fileDownloads;
    }
}
