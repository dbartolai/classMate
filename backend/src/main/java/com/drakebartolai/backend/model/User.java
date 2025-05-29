package com.drakebartolai.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    private UUID id; 

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;  // HASH PASSWORD

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Column(nullable = true)
    private String name;

    @Column
    private int onboarding;

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
    }
}
