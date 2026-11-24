package com.secretsanta.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HealthController {

    private static final Logger log = LoggerFactory.getLogger(HealthController.class);
    private final DataSource dataSource;

    public HealthController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping({"/api/health", "/health"})
    public ResponseEntity<Map<String, Object>> checkHealth() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("service", "secret-santa-backend");
        response.put("timestamp", Instant.now().toString());

        Map<String, Object> dbInfo = new LinkedHashMap<>();
        long start = System.currentTimeMillis();
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.execute("SELECT 1");
            long latency = System.currentTimeMillis() - start;

            dbInfo.put("status", "UP");
            dbInfo.put("latencyMs", latency);
            dbInfo.put("message", "Database connection is active and responsive");

            response.put("status", "UP");
            response.put("database", dbInfo);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Database health check failed: {}", e.getMessage());
            dbInfo.put("status", "DOWN");
            dbInfo.put("error", e.getMessage());

            response.put("status", "DOWN");
            response.put("database", dbInfo);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
        }
    }
}
