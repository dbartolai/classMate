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
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseCookie;
import org.springframework.http.HttpHeaders;

import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import java.time.Duration;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
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

    // ----- Register & Auto-login -----
    // * Checks if email exists
    // * Saves a new User object with Email and Password (hashed)
    // * Generates JWT for new user
    // * Stores JWT in the Postgres Token table
    // * Sets an HTTP cookie using JWT
    // * Returns user's email and UUID

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request, HttpServletResponse response) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        // Create user
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        // Auto-login logic (same as login)
        String jwt = jwtUtil.generateToken(user.getEmail());

        Token token = new Token();
        token.setToken(jwt);
        token.setUser(user);
        token.setRevoked(false);
        token.setExpired(false);
        tokenRepository.save(token);

        ResponseCookie cookie = ResponseCookie.from("token", jwt)
                .httpOnly(true)
                .secure(false) // Set to true in production!
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofDays(1))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(new AuthResponse(user.getEmail(), user.getId()));
    }

    // ----- Login -----
    // * Looks up user's email
    // * Compares the entered password with the stored one
    // * If password is correct, generate and store a new JWT
    // * Set a new HTTP cookie with JWT
    // * Returns user info (email and UUID)

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request, HttpServletResponse response) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        String jwt = jwtUtil.generateToken(user.getEmail());

        Token token = new Token();
        token.setToken(jwt);
        token.setUser(user);
        token.setRevoked(false);
        token.setExpired(false);
        tokenRepository.save(token);

        ResponseCookie cookie = ResponseCookie.from("token", jwt)
                .httpOnly(true)
                .secure(false) // Set to true in production!
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofDays(1))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(new AuthResponse(user.getEmail(), user.getId()));
    }


    private String extractJwtFromCookie(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (jakarta.servlet.http.Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }


    // ----- Logout -----
    // * Clears the token cookie
    // * Exctract JWT from cookie
    // * Revokes cookie in db

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response, HttpServletRequest request) {

        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        String jwt = extractJwtFromCookie(request);

        if (jwt != null) {
            Token token = tokenRepository.findByToken(jwt).orElse(null);
            if (token != null) {
                token.setRevoked(true);
                token.setExpired(true);
                tokenRepository.save(token);
            }
        }



        return ResponseEntity.ok().body("Logged out successfully.");
    }

    // ----- USER DATA -----
    // * Get current auth from Spring Security
    // * Check if user is authenticated
    // * Use email to find user in db
    // * IF authenticated, return user info 
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(new AuthResponse(user.getEmail(), user.getId()));
    }

}
