package com.redbox.domain.notice.repository;

import com.redbox.domain.notice.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Query("select n from Notice n left join fetch n.attachFiles where n.id = :noticeId")
    Optional<Notice> findWithAttachFilesById(@Param("noticeId") Long id);

    @Modifying
    @Query("UPDATE Notice n SET n.noticeHits = n.noticeHits + 1 WHERE n.id = :id")
    void increaseHit(@Param("id") Long id);
}
