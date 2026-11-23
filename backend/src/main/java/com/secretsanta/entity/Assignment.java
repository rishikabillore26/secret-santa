package com.secretsanta.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "assignments", uniqueConstraints = {
    @UniqueConstraint(name = "uk_assignment_santa", columnNames = {"santa_id"}),
    @UniqueConstraint(name = "uk_assignment_recipient", columnNames = {"recipient_id"})
})
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "santa_id", nullable = false, unique = true)
    private User santa;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recipient_id", nullable = false, unique = true)
    private User recipient;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Assignment() {
    }

    public Assignment(User santa, User recipient) {
        this.santa = santa;
        this.recipient = recipient;
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSanta() {
        return santa;
    }

    public void setSanta(User santa) {
        this.santa = santa;
    }

    public User getRecipient() {
        return recipient;
    }

    public void setRecipient(User recipient) {
        this.recipient = recipient;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
