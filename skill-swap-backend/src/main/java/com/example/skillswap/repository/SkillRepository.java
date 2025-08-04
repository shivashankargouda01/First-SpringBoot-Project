package com.example.skillswap.repository;

import com.example.skillswap.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByNameAndType(String name, String type);

    List<Skill> findByUserId(Long userId);
}
