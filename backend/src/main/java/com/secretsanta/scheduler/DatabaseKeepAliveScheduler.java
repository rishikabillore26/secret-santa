package com.secretsanta.scheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

@Component
public class DatabaseKeepAliveScheduler {

    private static final Logger log = LoggerFactory.getLogger(DatabaseKeepAliveScheduler.class);
    private final DataSource dataSource;

    public DatabaseKeepAliveScheduler(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    /**
     * Automatically runs every 1 minute (60,000 ms) with an initial delay of 10 seconds.
     * Executes a lightweight database ping query (SELECT 1) to keep HikariCP database connections
     * alive and avoid idle connection timeouts on cloud-hosted databases (e.g. Enzonic MySQL).
     */
    @Scheduled(fixedRate = 60000, initialDelay = 10000)
    public void pingDatabase() {
        long start = System.currentTimeMillis();
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.setQueryTimeout(3);
            stmt.execute("SELECT 1");
            long elapsed = System.currentTimeMillis() - start;
            log.info("⏰ Keep-alive scheduled task: Database ping successful ({} ms)", elapsed);
        } catch (Exception e) {
            log.warn("⚠️ Keep-alive scheduled task: Database ping failed: {}", e.getMessage());
        }
    }
}
