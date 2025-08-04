package com.example.skillswap.controller;

import com.example.skillswap.model.User;
import com.example.skillswap.model.Skill;
import com.example.skillswap.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private SkillRepository skillRepository;

    // Search users by skill name and type ("teach" or "learn")
    @GetMapping
    public List<User> searchUsersBySkill(@RequestParam String skill, @RequestParam String type) {
        List<Skill> skills = skillRepository.findByNameAndType(skill, type);
        // Extract distinct users from skills
        return skills.stream()
                .map(Skill::getUser)
                .distinct()
                .collect(Collectors.toList());
    }
}
