package com.example.springbootclub.service;

import com.example.springbootclub.entity.Club;
import com.example.springbootclub.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClubService {

    @Autowired
    private ClubRepository clubRepository;

    public List<Club> getAllClubs() {
        return clubRepository.findAll();
    }

    public boolean isClubNameExist(String clubName) {
        return clubRepository.findByClubName(clubName).isPresent();
    }

    public Club addClub(Club club) {
        return clubRepository.save(club);
    }

    public Club updateClub(Club club) {
        return clubRepository.save(club);
    }

    public void deleteClub(Integer clubId) {
        clubRepository.deleteById(clubId);
    }

    public Optional<Club> findById(Integer clubId) {
        return clubRepository.findById(clubId);
    }
}