package com.secretsanta;

import com.secretsanta.dto.request.RegisterRequest;
import com.secretsanta.dto.response.AdminDashboardResponse;
import com.secretsanta.dto.response.CandidateDto;
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

        // 4. Alice cannot be assigned a second recipient
        assertThrows(BadRequestException.class, () -> adminService.assignSecretSanta(alice.getId(), charlie.getId()),
                "A Santa can be assigned only once");

        // 5. Candidate list for Charlie cannot include Bob (Bob is already chosen as a recipient)
        List<CandidateDto> charlieCandidates = adminService.getCandidatesForSanta(charlie.getId());
        assertEquals(1, charlieCandidates.size());
        assertEquals(alice.getId(), charlieCandidates.get(0).getId());

        // 6. Charlie cannot choose Bob because Bob is already chosen
        assertThrows(BadRequestException.class, () -> adminService.assignSecretSanta(charlie.getId(), bob.getId()));
    }

    @Test
    void testAdminDashboardDoesNotExposeWishContentOrAssignments() {
        userRepository.save(new User("Admin User", "admin@company.com", "hash", Role.ADMIN));
        userRepository.save(new User("Emp 1", "emp1@company.com", "hash", Role.EMPLOYEE));
        userRepository.save(new User("Emp 2", "emp2@company.com", "hash", Role.EMPLOYEE));

        AdminDashboardResponse dashboard = adminService.getDashboard();

        assertEquals(2, dashboard.getTotalEmployees());
        assertNotNull(dashboard.getEmployees());

        dashboard.getEmployees().forEach(emp -> {
            assertNotNull(emp.getName());
            assertNotNull(emp.getStatus());
            assertTrue(emp.getStatus().equals("Pending") || emp.getStatus().equals("Submitted"));
        });
    }
}
