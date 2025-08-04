package com.example.skillswap.service;

import com.example.skillswap.model.User;
import com.example.skillswap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User registerUser(String username, String password, String role, String email) {
        if (userRepo.findByUsername(username).isPresent())
            throw new RuntimeException("Username exists");
        User user = new User();
        user.setUsername(username);
        user.setPassword(encoder.encode(password));
        user.setRole(role);
        user.setEmail(email);
        return userRepo.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    // Add authentication/getByID helpers as needed
}
