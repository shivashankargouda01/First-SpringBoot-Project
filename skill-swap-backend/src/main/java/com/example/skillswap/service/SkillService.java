package com.example.skillswap.service;

import com.example.skillswap.model.Skill;
import com.example.skillswap.model.User;
import com.example.skillswap.repository.SkillRepository;
import com.example.skillswap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepo;

    @Autowired
    private UserRepository userRepo;

    public Skill addSkillToUser(Long userId, String name, String type) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        Skill skill = new Skill();
        skill.setName(name);
        skill.setType(type);
        skill.setUser(user);
        return skillRepo.save(skill);
    }

    public List<Skill> getSkillsForUser(Long userId) {
        return skillRepo.findByUserId(userId);
    }

    // More methods as needed
}
