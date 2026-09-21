
package com.example.springbootclub.repository;

import com.example.springbootclub.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    Optional<Student> findByStudentNum(String studentNum);
}