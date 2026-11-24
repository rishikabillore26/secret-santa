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

        List<Assignment> allAssignments = assignmentRepository.findAll();
        Map<Long, Assignment> santaToAssignmentMap = allAssignments.stream()
                .collect(Collectors.toMap(a -> a.getSanta().getId(), a -> a, (a1, a2) -> a1));

        for (User emp : employees) {
            long wishCount = wishRepository.countByUserId(emp.getId());
            String status = wishCount > 0 ? "Submitted" : "Pending";
            if (wishCount > 0) {
                submittedCount++;
            } else {
                pendingCount++;
            }

            Assignment assignment = santaToAssignmentMap.get(emp.getId());
            boolean assigned = assignment != null && assignment.getRecipient() != null;
            Long recipientId = null;
            String recipientName = null;

            if (assigned) {
                assignedCount++;
                recipientId = assignment.getRecipient().getId();
                recipientName = assignment.getRecipient().getName();
            } else {
                unassignedCount++;
            }

            statusList.add(new EmployeeStatusDto(
                    emp.getId(),
                    emp.getName(),
                    status,
                    assigned,
                    recipientId,
                    recipientName
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

        // List must contain ONLY employees who are:
        // a) not the Santa himself, and
        // b) not already chosen as a recipient by ANOTHER Santa (current Santa's own recipient is allowed so they can re-select or keep)
        List<Assignment> allAssignments = assignmentRepository.findAll();
        Set<Long> chosenRecipientIdsByOthers = allAssignments.stream()
                .filter(a -> !a.getSanta().getId().equals(santaId))
                .map(a -> a.getRecipient().getId())
                .collect(Collectors.toSet());

        List<User> employees = userRepository.findByRoleOrderByNameAsc(Role.EMPLOYEE);

        return employees.stream()
                .filter(emp -> !emp.getId().equals(santaId))
                .filter(emp -> !chosenRecipientIdsByOthers.contains(emp.getId()))
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

        // If recipient is already chosen by another Santa, reject
        Optional<Assignment> existingForRecipient = assignmentRepository.findByRecipientId(recipientId);
        if (existingForRecipient.isPresent() && !existingForRecipient.get().getSanta().getId().equals(santaId)) {
            throw new BadRequestException("This recipient is already chosen by another Secret Santa.");
        }

        // If this Santa is already assigned, update their recipient (allows reassigning / changing)
        Optional<Assignment> existingForSanta = assignmentRepository.findBySantaId(santaId);
        if (existingForSanta.isPresent()) {
            Assignment existing = existingForSanta.get();
            existing.setRecipient(recipient);
            assignmentRepository.save(existing);
            return;
        }

        // Create new assignment
        Assignment assignment = new Assignment(santa, recipient);
        assignmentRepository.save(assignment);
    }

    @Transactional
    public void removeAssignment(Long santaId) {
        assignmentRepository.deleteBySantaId(santaId);
    }
}
