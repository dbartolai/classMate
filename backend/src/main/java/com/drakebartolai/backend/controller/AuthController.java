package com.drakebartolai.backend.controller;

import com.drakebartolai.backend.dto.AuthRequest;
import com.drakebartolai.backend.dto.AuthResponse;
import com.drakebartolai.backend.model.User;
import com.drakebartolai.backend.repository.UserRepository;
import com.drakebartolai.backend.repository.TokenRepository;
import com.drakebartolai.backend.model.Token;
import com.drakebartolai.backend.service.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;


import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenRepository tokenRepository;


    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        User user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        String jwt = jwtUtil.generateToken(user.getEmail());

        Token token = new Token();
        token.setToken(jwt); // your generated JWT string
        token.setUser(user);
        token.setRevoked(false);
        token.setExpired(false);
        tokenRepository.save(token);


        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Missing or invalid Authorization header");
        }
        String jwt = authHeader.substring(7); // Remove "Bearer "
        Token token = tokenRepository.findByToken(jwt).orElse(null);
        if (token != null) {
            token.setRevoked(true);
            token.setExpired(true); // Optional: mark as both revoked and expired
            tokenRepository.save(token);
        }
        return ResponseEntity.ok().body("Logged out successfully.");
    }


}
