package com.example.springbootclub.repository;

import com.example.springbootclub.entity.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RegisterRepository extends JpaRepository<Register, Integer> {
    List<Register> findByStudent_StudentId(Integer studentId);
    List<Register> findByClub_ClubId(Integer clubId);
    Optional<Register> findByStudent_StudentIdAndClub_ClubId(Integer studentId, Integer clubId);
}