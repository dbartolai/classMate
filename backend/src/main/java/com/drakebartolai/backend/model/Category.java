package com.drakebartolai.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class Category {

    @Id
    private UUID id = UUID.randomUUID();

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(nullable = false)
    private Float weight;  // Contribution to final grade (e.g., 0.25 for 25%)

    @Column(nullable = false)
    private Float score;   // Calculated or entered score in this category

    @Column(nullable = false)
    private int number;    // Number of items in this category

    @Column
    private Integer drops; // Optional number of lowest scores to drop

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean type;   // "0: test" or "1: assignment"
}
