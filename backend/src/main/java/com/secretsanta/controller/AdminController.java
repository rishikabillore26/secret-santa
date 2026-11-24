package com.secretsanta.controller;

import com.secretsanta.dto.request.AssignSantaRequest;
import com.secretsanta.dto.response.AdminDashboardResponse;
import com.secretsanta.dto.response.CandidateDto;
import com.secretsanta.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> getDashboard() {
        AdminDashboardResponse response = adminService.getDashboard();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/employees/{santaId}/candidates")
    public ResponseEntity<List<CandidateDto>> getCandidatesForSanta(@PathVariable Long santaId) {
        List<CandidateDto> candidates = adminService.getCandidatesForSanta(santaId);
        return ResponseEntity.ok(candidates);
    }

    @PostMapping("/assign")
    public ResponseEntity<Map<String, String>> assignSecretSanta(@Valid @RequestBody AssignSantaRequest request) {
        adminService.assignSecretSanta(request.getSantaId(), request.getRecipientId());
        return ResponseEntity.ok(Map.of("message", "Secret Santa assigned successfully!"));
    }

    @DeleteMapping("/assignments/{santaId}")
    public ResponseEntity<Map<String, String>> removeAssignment(@PathVariable Long santaId) {
        adminService.removeAssignment(santaId);
        return ResponseEntity.ok(Map.of("message", "Secret Santa assignment removed successfully!"));
    }
}
