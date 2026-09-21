package com.example.springbootclub.service;

import com.example.springbootclub.entity.Club;
import com.example.springbootclub.entity.Register;
import com.example.springbootclub.entity.Student;
import com.example.springbootclub.repository.RegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RegisterService {

    @Autowired
    private RegisterRepository registerRepository;

    public Register addRegister(Club club, Student student, String status) {
        Register register = new Register(club, student, status);
        return registerRepository.save(register);
    }

    public Register updateStatus(Register register, String newStatus) {
        register.setRegisterStatus(newStatus);
        return registerRepository.save(register);
    }

    public List<Register> getRegistersByStudent(Integer studentId) {
        return registerRepository.findByStudent_StudentId(studentId);
    }

    public Optional<Register> findById(Integer registerId) {
        return registerRepository.findById(registerId);
    }

    public Optional<Register> findByStudentIdAndClubId(Integer studentId, Integer clubId) {
        return registerRepository.findByStudent_StudentIdAndClub_ClubId(studentId, clubId);
    }
}