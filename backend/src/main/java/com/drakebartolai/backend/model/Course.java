package com.drakebartolai.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue
    private UUID id;  

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  

    @Column(nullable = false)
    private String name;

    @Column
    private int semester;
}
