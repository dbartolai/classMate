package com.drakebartolai.backend.config;

import com.drakebartolai.backend.service.JwtUtil;
import com.drakebartolai.backend.repository.UserRepository;
import com.drakebartolai.backend.model.User;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;


public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;

    public JwtAuthFilter(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        String token = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        } else if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    System.out.println("JwtAuthFilter: token = " + token);

                    break;
                }
            }
        }

        if (token != null) {
            System.out.println("JwtAuthFilter: About to extract email from token");
            String email = jwtUtil.extractEmail(token);
            System.out.println("JwtAuthFilter: email = " + email);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = userRepository.findByEmail(email).orElse(null);
                System.out.println("JwtAuthFilter: user = " + user);

                if (user != null && jwtUtil.validateToken(token, email)) {
                    System.out.println("JwtAuthFilter: Token validated, setting authentication");
                    // ...rest of your code...
                        UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                } else {
                    System.out.println("JwtAuthFilter: Token invalid or user not found");
                }
            } else {
                System.out.println("JwtAuthFilter: Email extraction failed or authentication already present");
            }
        } else {
            System.out.println("JwtAuthFilter: No token found in header or cookie");
        }



        filterChain.doFilter(request, response);
    }
}
