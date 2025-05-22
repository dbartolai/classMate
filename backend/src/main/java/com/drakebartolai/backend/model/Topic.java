package com.drakebartolai.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "topics")
public class Topic {

    @Id
    private UUID id = UUID.randomUUID();

    @ManyToOne
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    @Column(nullable = false)
    private String name;

    @Column
    private int confidence; // user's confidence in this topic (0.0–1.0 or 0–100 scale)

    @Column
    private Float elo; // system-calculated proficiency score
}
