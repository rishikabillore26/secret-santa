package com.secretsanta.service;

import com.secretsanta.dto.request.WishRequest;
import com.secretsanta.dto.response.EmployeeStatusResponse;
import com.secretsanta.dto.response.RecipientResponse;
import com.secretsanta.dto.response.WishResponse;
import com.secretsanta.entity.Assignment;
import com.secretsanta.entity.User;
import com.secretsanta.entity.Wish;
import com.secretsanta.exception.BadRequestException;
import com.secretsanta.exception.ResourceNotFoundException;
import com.secretsanta.exception.UnauthorizedActionException;
import com.secretsanta.repository.AssignmentRepository;
import com.secretsanta.repository.UserRepository;
import com.secretsanta.repository.WishRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final UserRepository userRepository;
    private final WishRepository wishRepository;
    private final AssignmentRepository assignmentRepository;

    public EmployeeService(UserRepository userRepository,
                           WishRepository wishRepository,
                           AssignmentRepository assignmentRepository) {
        this.userRepository = userRepository;
        this.wishRepository = wishRepository;
        this.assignmentRepository = assignmentRepository;
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Transactional(readOnly = true)
    public List<WishResponse> getMyWishes(String userEmail) {
        User user = getUserByEmail(userEmail);
        return wishRepository.findByUserIdOrderByCreatedAtAsc(user.getId())
                .stream()
                .map(this::mapToWishResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public WishResponse addWish(String userEmail, WishRequest request) {
        User user = getUserByEmail(userEmail);

        // Security rule: Maximum 3 wishes per employee enforced on the backend
        long existingCount = wishRepository.countByUserId(user.getId());
        if (existingCount >= 3) {
            throw new BadRequestException("Maximum of 3 wishes allowed per employee.");
        }

        Wish wish = new Wish(
                user,
                request.getProductName(),
                request.getProductUrl(),
                request.getPrice(),
                request.getNote()
        );

        Wish saved = wishRepository.save(wish);
        return mapToWishResponse(saved);
    }

    @Transactional
    public WishResponse updateWish(String userEmail, Long wishId, WishRequest request) {
        User user = getUserByEmail(userEmail);

        Wish wish = wishRepository.findById(wishId)
                .orElseThrow(() -> new ResourceNotFoundException("Wish not found with id: " + wishId));

        // Security check: Verify wish belongs to logged in user
        if (!wish.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedActionException("You do not have permission to edit this wish.");
        }

        wish.setProductName(request.getProductName());
        wish.setProductUrl(request.getProductUrl());
        wish.setPrice(request.getPrice());
        wish.setNote(request.getNote());

        Wish updated = wishRepository.save(wish);
        return mapToWishResponse(updated);
    }

    @Transactional
    public void deleteWish(String userEmail, Long wishId) {
        User user = getUserByEmail(userEmail);

        Wish wish = wishRepository.findById(wishId)
                .orElseThrow(() -> new ResourceNotFoundException("Wish not found with id: " + wishId));

        // Security check: Verify wish belongs to logged in user
        if (!wish.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedActionException("You do not have permission to delete this wish.");
        }

        wishRepository.delete(wish);
    }

    @Transactional(readOnly = true)
    public RecipientResponse getMyRecipient(String userEmail) {
        User user = getUserByEmail(userEmail);

        // Look up assignment where current user is Santa.
        // SECURITY: Takes NO ID param from client; looks up from JWT identity.
        // NEVER reveals who is Santa of this user.
        Assignment assignment = assignmentRepository.findBySantaId(user.getId())
                .orElseThrow(() -> new BadRequestException("Your Secret Santa match isn't ready yet, check back soon!"));

        User recipient = assignment.getRecipient();
        List<WishResponse> wishes = wishRepository.findByUserIdOrderByCreatedAtAsc(recipient.getId())
                .stream()
                .map(this::mapToWishResponse)
                .collect(Collectors.toList());

        // Return only recipient name and recipient wishes.
        return new RecipientResponse(recipient.getName(), wishes);
    }

    @Transactional(readOnly = true)
    public EmployeeStatusResponse getStatus(String userEmail) {
        User user = getUserByEmail(userEmail);
        boolean assigned = assignmentRepository.existsBySantaId(user.getId());
        long wishCount = wishRepository.countByUserId(user.getId());
        return new EmployeeStatusResponse(assigned, wishCount);
    }

    private WishResponse mapToWishResponse(Wish wish) {
        return new WishResponse(
                wish.getId(),
                wish.getProductName(),
                wish.getProductUrl(),
                wish.getPrice(),
                wish.getNote(),
                wish.getCreatedAt(),
                wish.getUpdatedAt()
        );
    }
}
