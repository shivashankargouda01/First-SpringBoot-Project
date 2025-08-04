package com.example.skillswap.controller;

import com.example.skillswap.model.SkillSwapRequest;
import com.example.skillswap.model.User;
import com.example.skillswap.repository.UserRepository;
import com.example.skillswap.service.SkillSwapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/swaps")
public class SkillSwapController {

    @Autowired
    private SkillSwapService swapService;

    @Autowired
    private UserRepository userRepo;

    // Send a skill swap request
    @PostMapping("/request")
    public SkillSwapRequest sendRequest(@RequestBody Map<String, String> body) {
        User sender = userRepo.findById(Long.parseLong(body.get("senderId")))
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User recipient = userRepo.findById(Long.parseLong(body.get("recipientId")))
                .orElseThrow(() -> new RuntimeException("Recipient not found"));
        String requestedSkill = body.get("requestedSkill");
        String desiredSkill = body.get("desiredSkill");
        LocalDateTime proposedDateTime = LocalDateTime.parse(body.get("proposedDateTime"));
        String phoneNumber = body.get("phoneNumber"); // <-- new field extracted here

        // Pass phoneNumber to the service layer
        return swapService.sendSwapRequest(
                sender.getId(),
                recipient.getId(),
                requestedSkill,
                desiredSkill,
                proposedDateTime,
                phoneNumber); // pass phoneNumber here
    }

    // ... existing methods unchanged ...

    // Get incoming (pending) swap requests for a user
    @GetMapping("/pending/{userId}")
    public List<SkillSwapRequest> getIncomingRequests(@PathVariable Long userId) {
        User recipient = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return swapService.getSwapsForUser(recipient);
    }

    // Get outgoing swap requests sent by user
    @GetMapping("/sent/{userId}")
    public List<SkillSwapRequest> getSentRequests(@PathVariable Long userId) {
        User sender = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return swapService.getSentSwaps(sender);
    }

    // Update swap request status (accept/reject)
    @PatchMapping("/status/{swapId}")
    public SkillSwapRequest updateSwapStatus(@PathVariable Long swapId, @RequestParam String status) {
        return swapService.updateStatus(swapId, status);
    }
}