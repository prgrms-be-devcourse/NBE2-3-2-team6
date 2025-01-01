package com.redbox.domain.redbox.repository;

import com.redbox.domain.redbox.entity.RedboxReceiptGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RedboxReceiptGroupRepository extends JpaRepository<RedboxReceiptGroup, Long> {

    // RedboxReceiptGroup 테이블의 행 수를 조회하는 메서드
    long count();
}
