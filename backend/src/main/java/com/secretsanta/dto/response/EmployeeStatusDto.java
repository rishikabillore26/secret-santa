package com.secretsanta.dto.response;

public class EmployeeStatusDto {
    private Long id;
    private String name;
    private String email;
    private String status; // "Submitted" or "Pending"
    private boolean assigned; // true if this santa has a recipient, false otherwise
    private Long recipientId; // id of the assigned recipient (if assigned)
    private String recipientName; // name of the assigned recipient (if assigned)

    public EmployeeStatusDto() {
    }

    public EmployeeStatusDto(Long id, String name, String status, boolean assigned) {
        this(id, name, null, status, assigned, null, null);
    }

    public EmployeeStatusDto(Long id, String name, String email, String status, boolean assigned, Long recipientId, String recipientName) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.status = status;
        this.assigned = assigned;
        this.recipientId = recipientId;
        this.recipientName = recipientName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isAssigned() {
        return assigned;
    }

    public void setAssigned(boolean assigned) {
        this.assigned = assigned;
    }

    public Long getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(Long recipientId) {
        this.recipientId = recipientId;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }
}
