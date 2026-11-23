package com.secretsanta.repository;

import com.secretsanta.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Optional<Assignment> findBySantaId(Long santaId);
    boolean existsBySantaId(Long santaId);
    Optional<Assignment> findByRecipientId(Long recipientId);
    boolean existsByRecipientId(Long recipientId);
    void deleteBySantaId(Long santaId);
}
