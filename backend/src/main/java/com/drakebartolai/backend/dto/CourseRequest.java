package com.drakebartolai.backend.dto;
import java.util.UUID;
import java.lang.String;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseResponse {
    private String name;
    private int semester; // Ex. Fall '25 -> 20254 (Fall is 4th semester)
}