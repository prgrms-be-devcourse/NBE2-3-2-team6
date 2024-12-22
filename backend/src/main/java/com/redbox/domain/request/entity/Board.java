package com.redbox.domain.request.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Getter
@Setter
@Service
@NoArgsConstructor
@Entity
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private long request_id; // 게시글 아이디

    // TODO : user 관련 부분 수정 필요 (현재는 임의값 설정)
    //@ManyToOne
    //@JoinColumn(name = "user_id", nullable = false)
    //private User user_id; // 외래키(사용자 아이디)
    private int user_id;

    private String request_title;
    private String request_content;
    private int target_amount;
    private int current_amount;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDate create_at;
    private String create_by;

    private LocalDate update_at;
    private String update_by;

    private LocalDate donation_start_date;
    private LocalDate donation_end_date;

    private String request_attach_file; // 파일 로컬에 저장

    @Enumerated(EnumType.STRING)
    private Priority priority; // 중요도

    private int request_hits;
    private int request_likes; // 좋아요 수

    private int file_downloads;
    // private boolean isLiked; // 개인당 좋아요 여부

    public Board(long request_id, int user_id, String request_title, String request_content, int target_amount, int current_amount, Status status, LocalDate create_at, String create_by, LocalDate update_at, String update_by, LocalDate donation_start_date, LocalDate donation_end_date, String request_attach_file, Priority priority, int request_hits, int request_likes, int file_downloads) {
        this.request_id = request_id;
        this.user_id = user_id;
        this.request_title = request_title;
        this.request_content = request_content;
        this.target_amount = target_amount;
        this.current_amount = current_amount;
        this.status = status;
        this.create_at = create_at;
        this.create_by = create_by;
        this.update_at = update_at;
        this.update_by = update_by;
        this.donation_start_date = donation_start_date;
        this.donation_end_date = donation_end_date;
        this.request_attach_file = request_attach_file;
        this.priority = priority;
        this.request_hits = request_hits;
        this.request_likes = request_likes;
        this.file_downloads = file_downloads;
        //this.isLiked = isLiked;
    }
}
