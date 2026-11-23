package com.secretsanta.dto.response;

public class EmployeeStatusResponse {
    private boolean assigned;
    private long wishCount;

    public EmployeeStatusResponse() {
    }

    public EmployeeStatusResponse(boolean assigned, long wishCount) {
        this.assigned = assigned;
        this.wishCount = wishCount;
    }

    public boolean isAssigned() {
        return assigned;
    }

    public void setAssigned(boolean assigned) {
        this.assigned = assigned;
    }

    public long getWishCount() {
        return wishCount;
    }

    public void setWishCount(long wishCount) {
        this.wishCount = wishCount;
    }
}
