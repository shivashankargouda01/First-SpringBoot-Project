package com.example.skillswap.repository;

import com.example.skillswap.model.SkillSwapRequest;
import com.example.skillswap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkillSwapRequestRepository extends JpaRepository<SkillSwapRequest, Long> {
    List<SkillSwapRequest> findByRecipientAndStatus(User recipient, String status);

    List<SkillSwapRequest> findBySender(User sender);
}
