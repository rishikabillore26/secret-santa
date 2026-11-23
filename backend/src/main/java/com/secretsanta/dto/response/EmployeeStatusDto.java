package com.secretsanta.dto.response;

public class EmployeeStatusDto {
    private Long id;
    private String name;
    private String status; // "Submitted" or "Pending"
    private boolean assigned; // true if this santa has a recipient, false otherwise

    public EmployeeStatusDto() {
    }

    public EmployeeStatusDto(Long id, String name, String status, boolean assigned) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.assigned = assigned;
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
}
