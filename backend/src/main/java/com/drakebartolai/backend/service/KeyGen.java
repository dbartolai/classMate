package com.drakebartolai.backend.service;

import io.jsonwebtoken.security.Keys;
import java.util.Base64;

public class KeyGen {
    public static void main(String[] args) {
        byte[] key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256).getEncoded();
        System.out.println(Base64.getEncoder().encodeToString(key));
    }
}
