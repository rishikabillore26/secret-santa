package com.secretsanta.repository;

import com.secretsanta.entity.Wish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {
    List<Wish> findByUserIdOrderByCreatedAtAsc(Long userId);
    long countByUserId(Long userId);
    Optional<Wish> findByIdAndUserId(Long id, Long userId);
}
