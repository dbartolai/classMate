package com.drakebartolai.backend.dto;
import java.util.UUID;
import java.lang.String;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private UUID id;
    private String email; 
    private String name;
    private int onboarding;
}