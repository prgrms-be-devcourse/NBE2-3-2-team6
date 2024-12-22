package com.redbox.domain.user.repository;

import com.redbox.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    @Query("SELECT u.name FROM User u WHERE u.id = :userId")
    Optional<String> findNameById(Long userId);
}
