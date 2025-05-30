package com.drakebartolai.backend.controller;

import com.drakebartolai.backend.model.User;
import com.drakebartolai.backend.repository.UserRepository;
import com.drakebartolai.backend.repository.CourseRepository;
import com.drakebartolai.backend.dto.CourseRequest;
import com.drakebartolai.backend.dto.CourseResponse;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*; // PostMapping, GetMapping, ...

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;
import java.util.List;
import java.util.stream.Collectors;






@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired 
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping
    public ResponseEntity<CourseResponse> createCourse( @RequestBody CourseRequest courseRequest ){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Course course = new Course();
        course.setName(courseRequest.getName());
        course.setSemester(courseRequest.getSemester());
        course.setUser(user);

        Course savedCourse = courseRepository.save(course);

        CourseResponse response = new CourseResponse(
            savedCourse.getId(),
            savedCourse.getName(),
            savedCourse.getSemester()
        );
        
        return ResponseEntity.status(201).body(response);

    }

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getCourses(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        List<Course> courses = courseRepository.findByUser(user);

        
        List<CourseResponse> responses = courses.stream()
            .map(course -> new CourseResponse (
                course.getId(),
                course.getName(),
                course.getSemester()
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(responses);



    }




    
}
