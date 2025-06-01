package com.drakebartolai.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class UserUpdate {
    private String email;      
    private String password;    
    private String name;
    private Integer onboarding; 
}
