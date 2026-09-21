package com.example.springbootclub.controller;

import com.example.springbootclub.entity.Club;
import com.example.springbootclub.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/club")
public class ClubController {

    @Autowired
    private ClubService clubService;

    /**
     * 获取所有社团列表
     */
    @GetMapping("/list")
    public ResponseEntity<List<Club>> getAllClubs() {
        return ResponseEntity.ok(clubService.getAllClubs());
    }

    /**
     * 新增社团
     */
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addClub(@RequestBody Club club) {
        Map<String, Object> response = new HashMap<>();

        if (clubService.isClubNameExist(club.getClubName())) {
            response.put("success", false);
            response.put("message", "社团名称已存在");
            return ResponseEntity.ok(response);
        }

        Club savedClub = clubService.addClub(club);
        response.put("success", true);
        response.put("message", "添加成功");
        response.put("club", savedClub);
        return ResponseEntity.ok(response);
    }

    /**
     * 修改社团信息
     */
    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateClub(@RequestBody Club club) {
        Map<String, Object> response = new HashMap<>();
        Club updatedClub = clubService.updateClub(club);
        response.put("success", true);
        response.put("message", "修改成功");
        response.put("club", updatedClub);
        return ResponseEntity.ok(response);
    }

    /**
     * 删除社团
     */
    @DeleteMapping("/delete/{clubId}")
    public ResponseEntity<Map<String, Object>> deleteClub(@PathVariable Integer clubId) {
        Map<String, Object> response = new HashMap<>();
        clubService.deleteClub(clubId);
        response.put("success", true);
        response.put("message", "删除成功");
        return ResponseEntity.ok(response);
    }
}