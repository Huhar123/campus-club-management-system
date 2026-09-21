package com.example.springbootclub.entity;

import javax.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studentId;

    private String studentName;

    @Column(unique = true)
    private String studentNum;

    private String password;

    public Student() {}

    public Student(String studentName, String studentNum, String password) {
        this.studentName = studentName;
        this.studentNum = studentNum;
        this.password = password;
    }

    public Integer getStudentId() { return studentId; }
    public void setStudentId(Integer studentId) { this.studentId = studentId; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getStudentNum() { return studentNum; }
    public void setStudentNum(String studentNum) { this.studentNum = studentNum; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}