package com.example.skillswap.controller;

import com.example.skillswap.model.User;
import com.example.skillswap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // Inject encoder bean

    @PostMapping("/register")
    public User register(@RequestBody Map<String, String> body) {
        return userService.registerUser(
                body.get("username"),
                body.get("password"),
                "USER", // fixed: directly using string "USER"
                body.get("email"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        Optional<User> userOpt = userService.findByUsername(username);
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            // In production, return JWT or session token here.
            return ResponseEntity.ok(
                    Map.of(
                            "userId", userOpt.get().getId(),
                            "username", username,
                            "role", userOpt.get().getRole()));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
