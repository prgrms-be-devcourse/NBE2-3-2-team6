package com.redbox.domain.request.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "likes")
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "likeId")
    private Long likeId;

    private Long requestId; // 게시글 ID

    // TODO : user 연결 필요
    private Long userId;

    @Column(nullable = false)
    private boolean isLiked;

    public Likes(Long likeId, Long requestId, Long userId, boolean isLiked) {
        this.likeId = likeId;
        this.requestId = requestId;
        this.userId = userId;
        this.isLiked = isLiked;
    }

}
