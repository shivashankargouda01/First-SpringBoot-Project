package com.example.skillswap.controller;

import com.example.skillswap.model.Skill;
import com.example.skillswap.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @PostMapping("/add")
    public Skill add(@RequestBody Map<String, String> body) {
        Long userId = Long.parseLong(body.get("userId"));
        String name = body.get("name");
        String type = body.get("type");
        return skillService.addSkillToUser(userId, name, type);
    }

    @GetMapping("/user/{userId}")
    public List<Skill> getByUser(@PathVariable Long userId) {
        return skillService.getSkillsForUser(userId);
    }
}
