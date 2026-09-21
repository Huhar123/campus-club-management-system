
package com.example.springbootclub.repository;

import com.example.springbootclub.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ClubRepository extends JpaRepository<Club, Integer> {
    Optional<Club> findByClubName(String clubName);
}