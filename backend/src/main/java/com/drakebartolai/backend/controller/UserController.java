package com.drakebartolai.backend.controller;

import com.drakebartolai.backend.model.User;

import com.drakebartolai.backend.repository.UserRepository;
import com.drakebartolai.backend.dto.UserUpdate;
import com.drakebartolai.backend.dto.AuthResponse;
import com.drakebartolai.backend.dto.UserResponse;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*; // PostMapping, GetMapping, ...

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.UUID;
import java.util.List;
import java.util.stream.Collectors;






@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired 
    private UserRepository userRepository;

    @Autowired 
    private PasswordEncoder passwordEncoder;

    @PatchMapping("/me")
    public ResponseEntity<UserResponse> updateUser(@RequestBody UserUpdate updates, Authentication auth) {

        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        boolean updated = false;

        if (updates.getName() != null) {
        user.setName(updates.getName());
        updated = true;
        }
        if (updates.getOnboarding() != null) {
            user.setOnboarding(updates.getOnboarding());
            updated = true;
        }
        if (updates.getEmail() != null && !updates.getEmail().equals(user.getEmail())) {
            user.setEmail(updates.getEmail());
            updated = true;
        }
        if (updates.getPassword() != null && !updates.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(updates.getPassword()));
            updated = true;
        }

        if (updated) {
            userRepository.save(user);
        }

        return ResponseEntity.ok(new UserResponse(user.getId(), user.getEmail(), user.getName(), user.getOnboarding()));

    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUser(Authentication auth) {

        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return ResponseEntity.ok(new UserResponse(user.getId(), user.getEmail(), user.getName(), user.getOnboarding()));
    }
}
