package com.redbox.domain.request.repository;

import com.redbox.domain.request.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, Long> {
}
