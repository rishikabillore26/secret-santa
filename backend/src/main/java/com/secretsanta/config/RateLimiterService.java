package com.secretsanta.config;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimiterService {

    private static final int MAX_ATTEMPTS = 10;
    private static final long LOCK_TIME_SECONDS = 120; // 2 minutes lockout after 10 fails

    private static class Attempt {
        int count;
        long lastAttemptTime;
        long lockUntilTime;

        Attempt() {
            this.count = 1;
            this.lastAttemptTime = Instant.now().getEpochSecond();
            this.lockUntilTime = 0;
        }
    }

    private final Map<String, Attempt> attempts = new ConcurrentHashMap<>();

    public boolean isBlocked(String key) {
        Attempt attempt = attempts.get(key);
        if (attempt == null) {
            return false;
        }
        long now = Instant.now().getEpochSecond();
        if (attempt.lockUntilTime > now) {
            return true;
        }
        // If lock expired, clear it
        if (attempt.lockUntilTime > 0 && attempt.lockUntilTime <= now) {
            attempts.remove(key);
            return false;
        }
        // If last attempt was more than 15 minutes ago, reset
        if (now - attempt.lastAttemptTime > 900) {
            attempts.remove(key);
            return false;
        }
        return false;
    }

    public void loginFailed(String key) {
        long now = Instant.now().getEpochSecond();
        attempts.compute(key, (k, attempt) -> {
            if (attempt == null) {
                return new Attempt();
            }
            // If already locked, don't increment further
            if (attempt.lockUntilTime > now) {
                return attempt;
            }
            attempt.count++;
            attempt.lastAttemptTime = now;
            if (attempt.count >= MAX_ATTEMPTS) {
                attempt.lockUntilTime = now + LOCK_TIME_SECONDS;
            }
            return attempt;
        });
    }

    public void loginSucceeded(String key) {
        attempts.remove(key);
    }
}
