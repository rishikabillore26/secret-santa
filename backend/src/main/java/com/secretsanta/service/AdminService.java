package com.secretsanta.service;

import com.secretsanta.dto.response.AdminDashboardResponse;
import com.secretsanta.dto.response.CandidateDto;
import com.secretsanta.dto.response.EmployeeStatusDto;
import com.secretsanta.entity.Assignment;
import com.secretsanta.entity.Role;
import com.secretsanta.entity.User;
import com.secretsanta.exception.BadRequestException;
import com.secretsanta.exception.ResourceNotFoundException;
import com.secretsanta.repository.AssignmentRepository;
import com.secretsanta.repository.UserRepository;
import com.secretsanta.repository.WishRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final WishRepository wishRepository;
    private final AssignmentRepository assignmentRepository;

    public AdminService(UserRepository userRepository,
                        WishRepository wishRepository,
                        AssignmentRepository assignmentRepository) {
        this.userRepository = userRepository;
        this.wishRepository = wishRepository;
        this.assignmentRepository = assignmentRepository;
    }

    @Transactional(readOnly = true)
    public AdminDashboardResponse getDashboard() {
        // Admin himself is not part of the list, only EMPLOYEE role users
        List<User> employees = userRepository.findByRoleOrderByNameAsc(Role.EMPLOYEE);

        long submittedCount = 0;
        long pendingCount = 0;
        long assignedCount = 0;
        long unassignedCount = 0;
        List<EmployeeStatusDto> statusList = new ArrayList<>();

        for (User emp : employees) {
            long wishCount = wishRepository.countByUserId(emp.getId());
            String status = wishCount > 0 ? "Submitted" : "Pending";
            if (wishCount > 0) {
                submittedCount++;
            } else {
                pendingCount++;
            }

            // A Santa can be assigned only once
            boolean assigned = assignmentRepository.existsBySantaId(emp.getId());
            if (assigned) {
                assignedCount++;
            } else {
                unassignedCount++;
            }

            // IMPORTANT: Privacy rule - never return recipient pair or wish content to admin
            statusList.add(new EmployeeStatusDto(
                    emp.getId(),
                    emp.getName(),
                    status,
                    assigned
            ));
        }

        return new AdminDashboardResponse(
                employees.size(),
                submittedCount,
                pendingCount,
                assignedCount,
                unassignedCount,
                statusList
        );
    }

    @Transactional(readOnly = true)
    public List<CandidateDto> getCandidatesForSanta(Long santaId) {
        User santa = userRepository.findById(santaId)
                .orElseThrow(() -> new ResourceNotFoundException("Santa employee not found with id: " + santaId));

        if (santa.getRole() != Role.EMPLOYEE) {
            throw new BadRequestException("Only employees can be assigned a Secret Santa.");
        }

        if (assignmentRepository.existsBySantaId(santaId)) {
            throw new BadRequestException("This Secret Santa has already been assigned. Assignments cannot be changed.");
        }

        // All employees who are ALREADY chosen as a recipient by any Santa
        List<Assignment> allAssignments = assignmentRepository.findAll();
        Set<Long> chosenRecipientIds = allAssignments.stream()
                .map(a -> a.getRecipient().getId())
                .collect(Collectors.toSet());

        // List must contain ONLY employees who are:
        // a) not the Santa himself, and
        // b) not already chosen as a recipient by another Santa
        // Must return only id and name of available employees, nothing else
        List<User> employees = userRepository.findByRoleOrderByNameAsc(Role.EMPLOYEE);

        return employees.stream()
                .filter(emp -> !emp.getId().equals(santaId))
                .filter(emp -> !chosenRecipientIds.contains(emp.getId()))
                .map(emp -> new CandidateDto(emp.getId(), emp.getName()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void assignSecretSanta(Long santaId, Long recipientId) {
        if (santaId.equals(recipientId)) {
            throw new BadRequestException("An employee cannot be their own Secret Santa.");
        }

        User santa = userRepository.findById(santaId)
                .orElseThrow(() -> new ResourceNotFoundException("Santa employee not found with id: " + santaId));
        User recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipient employee not found with id: " + recipientId));

        if (santa.getRole() != Role.EMPLOYEE || recipient.getRole() != Role.EMPLOYEE) {
            throw new BadRequestException("Both users must be employees.");
        }

        if (assignmentRepository.existsBySantaId(santaId)) {
            throw new BadRequestException("This Secret Santa has already been assigned a recipient. Assignments cannot be changed.");
        }

        if (assignmentRepository.existsByRecipientId(recipientId)) {
            throw new BadRequestException("This recipient is already chosen by another Secret Santa.");
        }

        // Save assignment. STRICT SECURITY: Do not log assignments anywhere.
        Assignment assignment = new Assignment(santa, recipient);
        assignmentRepository.save(assignment);
    }
}
