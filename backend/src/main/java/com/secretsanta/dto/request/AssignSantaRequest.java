package com.secretsanta.dto.request;

import jakarta.validation.constraints.NotNull;

public class AssignSantaRequest {

    @NotNull(message = "Santa ID is required")
    private Long santaId;

    @NotNull(message = "Recipient ID is required")
    private Long recipientId;

    public AssignSantaRequest() {
    }

    public AssignSantaRequest(Long santaId, Long recipientId) {
        this.santaId = santaId;
        this.recipientId = recipientId;
    }

    public Long getSantaId() {
        return santaId;
    }

    public void setSantaId(Long santaId) {
        this.santaId = santaId;
    }

    public Long getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(Long recipientId) {
        this.recipientId = recipientId;
    }
}
