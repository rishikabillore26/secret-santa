package com.secretsanta;

import com.secretsanta.dto.request.RegisterRequest;
import com.secretsanta.dto.response.AdminDashboardResponse;
import com.secretsanta.dto.response.CandidateDto;
import com.secretsanta.dto.response.EmployeeStatusDto;
import com.secretsanta.entity.Role;
import com.secretsanta.entity.User;
import com.secretsanta.exception.BadRequestException;
import com.secretsanta.repository.AssignmentRepository;
import com.secretsanta.repository.UserRepository;
import com.secretsanta.repository.WishRepository;
import com.secretsanta.service.AdminService;
import com.secretsanta.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@Transactional
public class SecurityAndAuthTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WishRepository wishRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @BeforeEach
    void setup() {
        assignmentRepository.deleteAll();
        wishRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    void testRegistrationCreatesOnlyEmployeeRole() {
        RegisterRequest request = new RegisterRequest("David Worker", "david@company.com", "Password@123");
        authService.register(request);

        User savedUser = userRepository.findByEmailIgnoreCase("david@company.com").orElse(null);
        assertNotNull(savedUser);
        assertEquals(Role.EMPLOYEE, savedUser.getRole(), "New registered user must ALWAYS have EMPLOYEE role");
    }

    @Test
    void testDuplicateEmailRegistrationFails() {
        RegisterRequest request1 = new RegisterRequest("Carol Admin", "carol@company.com", "Password@123");
        authService.register(request1);

        RegisterRequest request2 = new RegisterRequest("Carol Duplicate", "carol@company.com", "Different@123");
        assertThrows(BadRequestException.class, () -> authService.register(request2),
                "Registering with duplicate email must fail");
    }

    @Test
    void testRegistrationIsOpenAlways() {
        RegisterRequest request = new RegisterRequest("New Employee", "newemp@company.com", "Password@123");
        assertDoesNotThrow(() -> authService.register(request),
                "Registration must always be open for employees");
    }

    @Test
    void testAdminManualAssignmentValidation() {
        User alice = userRepository.save(new User("Alice", "alice@company.com", "hash", Role.EMPLOYEE));
        User bob = userRepository.save(new User("Bob", "bob@company.com", "hash", Role.EMPLOYEE));
        User charlie = userRepository.save(new User("Charlie", "charlie@company.com", "hash", Role.EMPLOYEE));

        // 1. Cannot assign santa to themselves
        assertThrows(BadRequestException.class, () -> adminService.assignSecretSanta(alice.getId(), alice.getId()));

        // 2. Candidate list for Alice contains Bob and Charlie, but not Alice
        List<CandidateDto> candidates = adminService.getCandidatesForSanta(alice.getId());
        assertEquals(2, candidates.size());
        assertTrue(candidates.stream().noneMatch(c -> c.getId().equals(alice.getId())));

        // 3. Assign Alice -> Bob
        adminService.assignSecretSanta(alice.getId(), bob.getId());
        assertTrue(assignmentRepository.existsBySantaId(alice.getId()));

        // 4. Assignments are changeable: Admin reassigns Alice -> Charlie
        adminService.assignSecretSanta(alice.getId(), charlie.getId());
        assertEquals(charlie.getId(), assignmentRepository.findBySantaId(alice.getId()).get().getRecipient().getId());

        // 5. Candidate list for Bob cannot include Charlie (Charlie is already chosen as recipient by Alice)
        List<CandidateDto> bobCandidates = adminService.getCandidatesForSanta(bob.getId());
        assertEquals(1, bobCandidates.size());
        assertEquals(alice.getId(), bobCandidates.get(0).getId());

        // 6. Bob cannot choose Charlie because Charlie is already chosen by Alice
        assertThrows(BadRequestException.class, () -> adminService.assignSecretSanta(bob.getId(), charlie.getId()));

        // 7. Admin can remove assignment
        adminService.removeAssignment(alice.getId());
        assertFalse(assignmentRepository.existsBySantaId(alice.getId()));
    }

    @Test
    void testAdminDashboardDisplaysRecipientWhenAssigned() {
        User admin = userRepository.save(new User("Admin User", "admin@company.com", "hash", Role.ADMIN));
        User emp1 = userRepository.save(new User("Emp 1", "emp1@company.com", "hash", Role.EMPLOYEE));
        User emp2 = userRepository.save(new User("Emp 2", "emp2@company.com", "hash", Role.EMPLOYEE));

        adminService.assignSecretSanta(emp1.getId(), emp2.getId());

        AdminDashboardResponse dashboard = adminService.getDashboard();

        assertEquals(2, dashboard.getTotalEmployees());
        assertNotNull(dashboard.getEmployees());

        EmployeeStatusDto emp1Dto = dashboard.getEmployees().stream()
                .filter(e -> e.getId().equals(emp1.getId()))
                .findFirst().orElse(null);

        assertNotNull(emp1Dto);
        assertTrue(emp1Dto.isAssigned());
        assertEquals(emp2.getName(), emp1Dto.getRecipientName());
        assertEquals(emp2.getId(), emp1Dto.getRecipientId());
    }
}
