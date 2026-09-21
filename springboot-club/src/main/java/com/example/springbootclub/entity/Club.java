package com.example.springbootclub.entity;

import javax.persistence.*;

@Entity
@Table(name = "clubs")
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer clubId;

    @Column(unique = true, nullable = false)
    private String clubName;

    private String clubType;

    public Club() {}

    public Club(String clubName, String clubType) {
        this.clubName = clubName;
        this.clubType = clubType;
    }

    public Integer getClubId() { return clubId; }
    public void setClubId(Integer clubId) { this.clubId = clubId; }
    public String getClubName() { return clubName; }
    public void setClubName(String clubName) { this.clubName = clubName; }
    public String getClubType() { return clubType; }
    public void setClubType(String clubType) { this.clubType = clubType; }
}