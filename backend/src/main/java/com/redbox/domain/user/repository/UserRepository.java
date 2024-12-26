package com.redbox.domain.user.repository;

import com.redbox.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    // 이메일을 기반으로 사용자 정보를 조회
    Optional<User> findByEmail(String email);
}
