package com.secretsanta.dto.response;

import java.util.List;

public class AdminDashboardResponse {
    private long totalEmployees;
    private long submittedCount;
    private long pendingCount;
    private long assignedCount;
    private long unassignedCount;
    private List<EmployeeStatusDto> employees;

    public AdminDashboardResponse() {
    }

    public AdminDashboardResponse(long totalEmployees, long submittedCount, long pendingCount, long assignedCount, long unassignedCount, List<EmployeeStatusDto> employees) {
        this.totalEmployees = totalEmployees;
        this.submittedCount = submittedCount;
        this.pendingCount = pendingCount;
        this.assignedCount = assignedCount;
        this.unassignedCount = unassignedCount;
        this.employees = employees;
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getSubmittedCount() {
        return submittedCount;
    }

    public void setSubmittedCount(long submittedCount) {
        this.submittedCount = submittedCount;
    }

    public long getPendingCount() {
        return pendingCount;
    }

    public void setPendingCount(long pendingCount) {
        this.pendingCount = pendingCount;
    }

    public long getAssignedCount() {
        return assignedCount;
    }

    public void setAssignedCount(long assignedCount) {
        this.assignedCount = assignedCount;
    }

    public long getUnassignedCount() {
        return unassignedCount;
    }

    public void setUnassignedCount(long unassignedCount) {
        this.unassignedCount = unassignedCount;
    }

    public List<EmployeeStatusDto> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeStatusDto> employees) {
        this.employees = employees;
    }
}
