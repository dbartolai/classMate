package com.drakebartolai.backend.controller;

import com.drakebartolai.backend.service.OpenAIService;
import com.drakebartolai.backend.model.QuizRequest;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.JsonNode; 
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final OpenAIService openAIService;

    public QuizController(OpenAIService openAIService) {
        this.openAIService = openAIService;
    }

    // Temporary test endpoint — you can hit this at http://localhost:8080/api/quiz/test
    @GetMapping("/test")
    public ResponseEntity<String> testOpenAI() {
        String prompt = """
            Generate 10 multiple choice quiz questions on the topic of photosynthesis. 
            Each question should include: A question string, a list of 4 answer choices, and a correct answer choice. 
            Return a JSON of the following format:

            {\"questions\" : [  { \"question\": \"Ask question here\", \"choices\": [{\"A\": \"Choice A here\"}, ... ], \"correct\": \"A, B, C, or D\" }, ...  ]}
        """;
        String result = openAIService.getChatCompletion(prompt);
        return ResponseEntity.ok(result);
    }


    @PostMapping("/gen")
    public ResponseEntity<String> generateQuiz(@RequestBody QuizRequest request) {
        String number = String.format("Generate %d multiple choice quiz questions", request.getNum());
        String subject = String.format(" for my test in my %s class. ", request.getSubject());
        String topics = String.format("This exam is on the following topics: %s. ", request.getTopics());

        String prompt = """
            Each question should include: A question string, a list of 4 answer choices, and a correct answer choice. 
            Return VALID JSON in the following format, and nothing else (no comments, questions, etc):
            {\"questions\" : [  { \"question\": \"Ask question here\", \"choices\": [{\"A\": \"Choice A here\"}, ... ], \"correct\": \"A, B, C, or D\" }, ...  ]}
        """;

        String result = openAIService.getChatCompletion(number + subject + topics + prompt);
        return ResponseEntity.ok(result);
    }

}


