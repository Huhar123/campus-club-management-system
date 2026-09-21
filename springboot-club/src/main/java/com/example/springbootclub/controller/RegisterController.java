package com.example.springbootclub.controller;

import com.example.springbootclub.entity.Club;
import com.example.springbootclub.entity.Register;
import com.example.springbootclub.entity.Student;
import com.example.springbootclub.service.ClubService;
import com.example.springbootclub.service.RegisterService;
import com.example.springbootclub.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/register")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @Autowired
    private ClubService clubService;

    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addRegister(
            @RequestParam Integer studentId,
            @RequestParam Integer clubId,
            @RequestParam(defaultValue = "已报名") String status) {

        Map<String, Object> response = new HashMap<>();

        Optional<Student> studentOpt = studentService.findById(studentId);
        Optional<Club> clubOpt = clubService.findById(clubId);

        if (!studentOpt.isPresent() || !clubOpt.isPresent()) {
            response.put("success", false);
            response.put("message", "学生或社团不存在");
            return ResponseEntity.ok(response);
        }

        Optional<Register> existing = registerService.findByStudentIdAndClubId(studentId, clubId);
        if (existing.isPresent()) {
            response.put("success", false);
            response.put("message", "您已经报名过该社团");
            return ResponseEntity.ok(response);
        }

        Register register = registerService.addRegister(clubOpt.get(), studentOpt.get(), status);
        response.put("success", true);
        response.put("message", "报名成功");
        response.put("register", register);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/status")
    public ResponseEntity<Map<String, Object>> updateStatus(
            @RequestParam Integer registerId,
            @RequestParam String newStatus) {

        Map<String, Object> response = new HashMap<>();

        Optional<Register> registerOpt = registerService.findById(registerId);
        if (!registerOpt.isPresent()) {
            response.put("success", false);
            response.put("message", "报名记录不存在");
            return ResponseEntity.ok(response);
        }

        Register updated = registerService.updateStatus(registerOpt.get(), newStatus);
        response.put("success", true);
        response.put("message", "状态修改成功");
        response.put("register", updated);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Register>> getRegistersByStudent(@PathVariable Integer studentId) {
        return ResponseEntity.ok(registerService.getRegistersByStudent(studentId));
    }

    @GetMapping("/find")
    public ResponseEntity<Map<String, Object>> findRegister(
            @RequestParam Integer studentId,
            @RequestParam Integer clubId) {

        Map<String, Object> response = new HashMap<>();
        Optional<Register> register = registerService.findByStudentIdAndClubId(studentId, clubId);
        if (register.isPresent()) {
            response.put("registerId", register.get().getRegisterId());
        }
        return ResponseEntity.ok(response);
    }
}