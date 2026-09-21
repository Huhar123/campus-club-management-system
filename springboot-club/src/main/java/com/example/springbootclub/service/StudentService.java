package com.example.springbootclub.service;

import com.example.springbootclub.entity.Student;
import com.example.springbootclub.repository.StudentRepository;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public boolean isStudentNumExist(String studentNum) {
        return studentRepository.findByStudentNum(studentNum).isPresent();
    }

    public Student register(Student student) {
        String encryptedPassword = DigestUtils.sha256Hex(student.getPassword());
        student.setPassword(encryptedPassword);
        return studentRepository.save(student);
    }

    public Optional<Student> findByStudentNum(String studentNum) {
        return studentRepository.findByStudentNum(studentNum);
    }

    public Optional<Student> findById(Integer studentId) {
        return studentRepository.findById(studentId);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void updateStudent(Student student) {
        studentRepository.save(student);
    }

    public void deleteStudent(Integer studentId) {
        studentRepository.deleteById(studentId);
    }
}