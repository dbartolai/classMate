package com.drakebartolai.backend.controller;

import com.drakebartolai.backend.service.OpenAIService;
import com.drakebartolai.backend.model.QuizRequest;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.JsonNode; 
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping
    public ResponseEntity<String> secureHello() {
        return ResponseEntity.ok("You are authenticated!");
    }


}
