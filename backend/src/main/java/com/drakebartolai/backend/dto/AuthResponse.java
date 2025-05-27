package com.drakebartolai.backend.dto;
import java.util.UUID;
import java.lang.String;


public class AuthResponse {
    private String email;
    private UUID id;

    public AuthResponse(String email, UUID id) {
        this.email = email;
        this.id = id;
    }

    public String getEmail(){
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UUID getId() {
        return this.id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

}
