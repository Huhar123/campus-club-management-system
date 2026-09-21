package com.example.springbootclub.controller;

import com.example.springbootclub.entity.Student;
import com.example.springbootclub.service.StudentService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Student student) {
        Map<String, Object> response = new HashMap<>();

        if (studentService.isStudentNumExist(student.getStudentNum())) {
            response.put("success", false);
            response.put("message", "学号已存在");
            return ResponseEntity.ok(response);
        }

        Student savedStudent = studentService.register(student);
        response.put("success", true);
        response.put("message", "注册成功");
        response.put("studentId", savedStudent.getStudentId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginInfo) {
        Map<String, Object> response = new HashMap<>();
        String studentNum = loginInfo.get("studentNum");
        String password = loginInfo.get("password");

        Optional<Student> studentOpt = studentService.findByStudentNum(studentNum);
        if (!studentOpt.isPresent()) {
            response.put("success", false);
            response.put("message", "学号不存在");
            return ResponseEntity.ok(response);
        }

        Student student = studentOpt.get();
        String encryptedPassword = DigestUtils.sha256Hex(password);
        if (!student.getPassword().equals(encryptedPassword)) {
            response.put("success", false);
            response.put("message", "密码错误");
            return ResponseEntity.ok(response);
        }

        response.put("success", true);
        response.put("message", "登录成功");
        response.put("studentId", student.getStudentId());
        response.put("studentName", student.getStudentName());
        return ResponseEntity.ok(response);
    }

    // 获取所有学生列表
    @GetMapping("/list")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    // 重置密码
    @PutMapping("/reset/{studentId}")
    public ResponseEntity<Map<String, Object>> resetPassword(@PathVariable Integer studentId) {
        Map<String, Object> response = new HashMap<>();
        Optional<Student> studentOpt = studentService.findById(studentId);
        if (!studentOpt.isPresent()) {
            response.put("success", false);
            response.put("message", "学生不存在");
            return ResponseEntity.ok(response);
        }
        Student student = studentOpt.get();
        student.setPassword(DigestUtils.sha256Hex("123456"));
        studentService.updateStudent(student);
        response.put("success", true);
        response.put("message", "重置成功");
        return ResponseEntity.ok(response);
    }

    // 删除学生
    @DeleteMapping("/delete/{studentId}")
    public ResponseEntity<Map<String, Object>> deleteStudent(@PathVariable Integer studentId) {
        Map<String, Object> response = new HashMap<>();
        studentService.deleteStudent(studentId);
        response.put("success", true);
        response.put("message", "删除成功");
        return ResponseEntity.ok(response);
    }
}