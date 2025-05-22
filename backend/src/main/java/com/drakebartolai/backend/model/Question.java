package com.drakebartolai.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "questions")
public class Question {

    @Id
    private UUID id = UUID.randomUUID();

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(nullable = false)
    private String[] options;  // Stored as a TEXT[] in PostgreSQL

    @Column(name = "correct_index", nullable = false)
    private int correctIndex;

    @Column(nullable = false)
    private String status = "unanswered";  // "unanswered", "correct", "incorrect"
}
