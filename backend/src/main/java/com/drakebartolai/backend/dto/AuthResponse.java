package com.drakebartolai.backend.dto;

public class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getAuthResponse(){
        return this.token;
    }
}
