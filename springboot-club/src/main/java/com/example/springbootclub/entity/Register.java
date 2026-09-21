package com.example.springbootclub.entity;

import javax.persistence.*;

@Entity
@Table(name = "registers")
public class Register {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer registerId;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    private String registerStatus;

    public Register() {}

    public Register(Club club, Student student, String registerStatus) {
        this.club = club;
        this.student = student;
        this.registerStatus = registerStatus;
    }

    public Integer getRegisterId() { return registerId; }
    public void setRegisterId(Integer registerId) { this.registerId = registerId; }

    public Club getClub() { return club; }
    public void setClub(Club club) { this.club = club; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public String getRegisterStatus() { return registerStatus; }
    public void setRegisterStatus(String registerStatus) { this.registerStatus = registerStatus; }
}