package com.secretsanta.config;

import com.secretsanta.entity.Role;
import com.secretsanta.entity.User;
import com.secretsanta.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:admin@secretsanta.local}")
    private String adminEmail;

    @Value("${app.admin.password:Admin@2025}")
    private String adminPassword;

    @Value("${app.admin.name:Office Administrator}")
    private String adminName;

    public AdminInitializer(UserRepository userRepository,
                            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Ensure default admin exists
        if (userRepository.findByEmailIgnoreCase(adminEmail).isEmpty()) {
            User admin = new User(
                    adminName,
                    adminEmail.toLowerCase().trim(),
                    passwordEncoder.encode(adminPassword),
                    Role.ADMIN
            );
            userRepository.save(admin);
        }
    }
}
