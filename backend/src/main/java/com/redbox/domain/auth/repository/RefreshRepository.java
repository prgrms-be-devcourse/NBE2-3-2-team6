package com.redbox.domain.auth.repository;

import com.redbox.domain.auth.entity.RefreshEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshRepository extends JpaRepository<RefreshEntity, Long> {

    // Refresh 토큰이 존재하는지 확인
    Boolean existsByRefresh(String refresh);

    // 특정 Refresh 토큰 삭제
    @Transactional
    void deleteByRefresh(String refresh);

    // 이메일로 Refresh 토큰 검색 (추가 필요 시)
    RefreshEntity findByEmail(String email);
}
