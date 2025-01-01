package com.redbox.domain.request.entity;

import com.redbox.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "requests")
public class Request extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId; // 게시글 아이디

    private Long userId;
    private String requestTitle;
    private String requestContent;
    private int targetAmount;
    private int currentAmount;

    @Enumerated(EnumType.STRING)
    private RequestStatus requestStatus;

    @Enumerated(EnumType.STRING)
    private RequestStatus progress;

    private LocalDate requestDate;
    private LocalDate donationStartDate;
    private LocalDate donationEndDate;

    private String requestAttachFile; // 파일 로컬에 저장

    @Enumerated(EnumType.STRING)
    private Priority priority; // 중요도

    private int requestHits;
    private int requestLikes; // 좋아요 수

    private int fileDownloads;

    @Builder
    public Request(Long userId, String requestTitle, String requestContent, int targetAmount, int currentAmount, RequestStatus requestStatus, RequestStatus progress, LocalDate donationStartDate, LocalDate donationEndDate, LocalDate requestDate, String requestAttachFile, Priority priority, int requestHits, int requestLikes, int fileDownloads) {
        this.userId = userId;
        this.requestTitle = requestTitle;
        this.requestContent = requestContent;
        this.targetAmount = targetAmount;
        this.currentAmount = currentAmount;
        this.requestStatus = requestStatus;
        this.progress = progress;
        this.donationStartDate = donationStartDate;
        this.donationEndDate = donationEndDate;
        this.requestDate = LocalDate.now();
        this.requestAttachFile = requestAttachFile;
        this.priority = priority;
        this.requestHits = requestHits;
        this.requestLikes = requestLikes;
        this.fileDownloads = fileDownloads;
    }

    public void updateRequest(String title, String content, LocalDate DonationStartDate, LocalDate DonationEndDate, int targetAmount) {
        this.requestTitle = title;
        this.requestContent = content;
        this.donationStartDate = DonationStartDate;
        this.donationEndDate = DonationEndDate;
        this.targetAmount = targetAmount;
    }

    public void attachFile(String filePath){this.requestAttachFile = filePath;}

    public void approve() {this.requestStatus = RequestStatus.APPROVE;}
    public void reject() {this.requestStatus = RequestStatus.REJECT;}
    public void expired() {this.requestStatus = RequestStatus.EXPIRED;}
    public void incrementHits() {this.requestHits = requestHits + 1;}
    public void incrementLikes() {this.requestLikes = requestLikes + 1;}
    public void decrementLikes() {this.requestLikes = requestLikes - 1;}
}
