package com.secretsanta.controller;

import com.secretsanta.dto.request.WishRequest;
import com.secretsanta.dto.response.EmployeeStatusResponse;
import com.secretsanta.dto.response.RecipientResponse;
import com.secretsanta.dto.response.WishResponse;
import com.secretsanta.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/status")
    public ResponseEntity<EmployeeStatusResponse> getStatus(Authentication authentication) {
        String userEmail = authentication.getName();
        EmployeeStatusResponse response = employeeService.getStatus(userEmail);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/wishes")
    public ResponseEntity<List<WishResponse>> getMyWishes(Authentication authentication) {
        String userEmail = authentication.getName();
        List<WishResponse> wishes = employeeService.getMyWishes(userEmail);
        return ResponseEntity.ok(wishes);
    }

    @PostMapping("/wishes")
    public ResponseEntity<WishResponse> addWish(Authentication authentication,
                                                @Valid @RequestBody WishRequest request) {
        String userEmail = authentication.getName();
        WishResponse created = employeeService.addWish(userEmail, request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/wishes/{id}")
    public ResponseEntity<WishResponse> updateWish(Authentication authentication,
                                                   @PathVariable Long id,
                                                   @Valid @RequestBody WishRequest request) {
        String userEmail = authentication.getName();
        WishResponse updated = employeeService.updateWish(userEmail, id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/wishes/{id}")
    public ResponseEntity<Map<String, String>> deleteWish(Authentication authentication,
                                                          @PathVariable Long id) {
        String userEmail = authentication.getName();
        employeeService.deleteWish(userEmail, id);
        return ResponseEntity.ok(Map.of("message", "Wish successfully deleted"));
    }

    @GetMapping("/recipient")
    public ResponseEntity<RecipientResponse> getMyRecipient(Authentication authentication) {
        // SECURITY: Takes NO user ID parameter. The user is identified solely via JWT authentication context.
        String userEmail = authentication.getName();
        RecipientResponse recipient = employeeService.getMyRecipient(userEmail);
        return ResponseEntity.ok(recipient);
    }
}
