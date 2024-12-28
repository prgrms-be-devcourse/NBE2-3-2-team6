package com.redbox.domain.request.repository;

import com.redbox.domain.request.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<Like, Long> {
    // 여러개의 파라미터 처리(userId, requestId)
    // Optional : no result 를 표현하기 위해 사용한다 -> 없는경우 DB에 추가를 해줘야함
    Optional<Like> findByUserIdAndRequestId(Long userId, Long requestId);
}
