package com.secretsanta.service;

import com.secretsanta.config.RateLimiterService;
import com.secretsanta.dto.request.LoginRequest;
import com.secretsanta.dto.request.RegisterRequest;
import com.secretsanta.dto.response.JwtAuthResponse;
import com.secretsanta.entity.Role;
import com.secretsanta.entity.User;
import com.secretsanta.exception.BadRequestException;
import com.secretsanta.repository.UserRepository;
import com.secretsanta.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final RateLimiterService rateLimiterService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       RateLimiterService rateLimiterService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.rateLimiterService = rateLimiterService;
    }

    @Transactional
    public JwtAuthResponse register(RegisterRequest request) {
        // Registration is always open for employees
        String normalizedEmail = request.getEmail().toLowerCase().trim();

        if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new BadRequestException("An account with this email address already exists.");
        }

        // Security rule: Registration ALWAYS creates EMPLOYEE role only. Client cannot set role.
        User user = new User(
                request.getName().trim(),
                normalizedEmail,
                passwordEncoder.encode(request.getPassword()),
                Role.EMPLOYEE
        );

        userRepository.save(user);

        String token = tokenProvider.generateToken(user.getEmail(), user.getRole().name());
        return new JwtAuthResponse(token, user.getName(), user.getEmail(), user.getRole().name());
    }

    public JwtAuthResponse login(LoginRequest request, String clientIp) {
        String normalizedEmail = request.getEmail().toLowerCase().trim();
        String rateLimitKey = clientIp + "_" + normalizedEmail;

        if (rateLimiterService.isBlocked(rateLimitKey)) {
            throw new BadRequestException("Too many failed login attempts. Please wait 10 minutes before trying again.");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(normalizedEmail, request.getPassword())
            );

            // Login successful
            rateLimiterService.loginSucceeded(rateLimitKey);

            User user = userRepository.findByEmailIgnoreCase(normalizedEmail)
                    .orElseThrow(() -> new BadRequestException("Invalid credentials"));

            String token = tokenProvider.generateToken(user.getEmail(), user.getRole().name());
            return new JwtAuthResponse(token, user.getName(), user.getEmail(), user.getRole().name());
        } catch (BadCredentialsException ex) {
            rateLimiterService.loginFailed(rateLimitKey);
            throw ex;
        }
    }
}
