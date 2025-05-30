package com.drakebartolai.backend.repository;

import com.drakebartolai.backend.model.Course;
import com.drakebartolai.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<Course, UUID> {

    List<Course> findByUser(User user);

    List<Course> findByUser_Id(UUID userId);

    Optional<Course> findByIdAndUser(UUID courseId, User user);

    Optional<Course> findByIdAndUser_Id(UUID courseId, UUID userId);
}
