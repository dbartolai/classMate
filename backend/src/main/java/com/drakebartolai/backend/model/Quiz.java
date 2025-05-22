package com.drakebartolai.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    private UUID id = UUID.randomUUID();

    @ManyToOne
    @JoinColumn(name = "study_plan_id", nullable = false)
    private StudyPlan studyPlan;

    @Column
    private LocalDate date;  // When the quiz is scheduled by study plan

    @Column
    private Float score;     // Percentage or raw score

    @Column(name = "is_completed")
    private boolean isCompleted = false;
}
