package com.secretsanta;

import com.secretsanta.dto.request.WishRequest;
import com.secretsanta.dto.response.WishResponse;
import com.secretsanta.entity.Role;
import com.secretsanta.entity.User;
import com.secretsanta.exception.BadRequestException;
import com.secretsanta.exception.UnauthorizedActionException;
import com.secretsanta.repository.AssignmentRepository;
import com.secretsanta.repository.UserRepository;
import com.secretsanta.repository.WishRepository;
import com.secretsanta.service.EmployeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@Transactional
public class WishAccessTest {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WishRepository wishRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    private User alice;
    private User bob;

    @BeforeEach
    void setup() {
        wishRepository.deleteAll();
        assignmentRepository.deleteAll();
        userRepository.deleteAll();

        alice = userRepository.save(new User("Alice", "alice@company.com", "passhash", Role.EMPLOYEE));
        bob = userRepository.save(new User("Bob", "bob@company.com", "passhash", Role.EMPLOYEE));
    }

    @Test
    void testMaxThreeWishesEnforced() {
        employeeService.addWish(alice.getEmail(), new WishRequest("Wish 1", "https://item1.com", new BigDecimal("15.00"), "First"));
        employeeService.addWish(alice.getEmail(), new WishRequest("Wish 2", "https://item2.com", new BigDecimal("25.00"), "Second"));
        employeeService.addWish(alice.getEmail(), new WishRequest("Wish 3", "https://item3.com", new BigDecimal("35.00"), "Third"));

        List<WishResponse> wishes = employeeService.getMyWishes(alice.getEmail());
        assertEquals(3, wishes.size());

        assertThrows(BadRequestException.class, () -> {
            employeeService.addWish(alice.getEmail(), new WishRequest("Wish 4", "https://item4.com", new BigDecimal("45.00"), "Fourth"));
        }, "Adding a 4th wish must be rejected by backend");
    }

    @Test
    void testEmployeeCannotEditOtherEmployeeWish() {
        WishResponse alicesWish = employeeService.addWish(alice.getEmail(),
                new WishRequest("Alice Coffee Mug", "https://mug.com", new BigDecimal("12.50"), "Favorite color blue"));

        WishRequest unauthorizedEdit = new WishRequest("Hacked Gift", "https://hacked.com", new BigDecimal("100.00"), "Modified by Bob");

        assertThrows(UnauthorizedActionException.class, () -> {
            employeeService.updateWish(bob.getEmail(), alicesWish.getId(), unauthorizedEdit);
        }, "Bob cannot edit Alice's wish");
    }

    @Test
    void testEmployeeCannotDeleteOtherEmployeeWish() {
        WishResponse alicesWish = employeeService.addWish(alice.getEmail(),
                new WishRequest("Alice Headphones", "https://audio.com", new BigDecimal("50.00"), "Noise cancelling"));

        assertThrows(UnauthorizedActionException.class, () -> {
            employeeService.deleteWish(bob.getEmail(), alicesWish.getId());
        }, "Bob cannot delete Alice's wish");

        assertTrue(wishRepository.findById(alicesWish.getId()).isPresent(), "Alice's wish must still exist");
    }
}
