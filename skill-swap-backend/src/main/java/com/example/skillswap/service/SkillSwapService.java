package com.example.skillswap.service;

import com.example.skillswap.model.SkillSwapRequest;
import com.example.skillswap.model.User;
import com.example.skillswap.repository.SkillSwapRequestRepository;
import com.example.skillswap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SkillSwapService {

        @Autowired
        private SkillSwapRequestRepository swapRepo;

        @Autowired
        private UserRepository userRepo;

        // Create and save a new SkillSwapRequest, now with phoneNumber
        public SkillSwapRequest sendSwapRequest(Long senderId, Long recipientId,
                        String requestedSkill, String desiredSkill,
                        LocalDateTime proposedDateTime, String phoneNumber) {

                User sender = userRepo.findById(senderId)
                                .orElseThrow(() -> new RuntimeException("Sender user not found"));
                User recipient = userRepo.findById(recipientId)
                                .orElseThrow(() -> new RuntimeException("Recipient user not found"));

                SkillSwapRequest request = new SkillSwapRequest();
                request.setSender(sender);
                request.setRecipient(recipient);
                request.setRequestedSkill(requestedSkill);
                request.setDesiredSkill(desiredSkill);
                request.setProposedDateTime(proposedDateTime);
                request.setStatus("PENDING"); // default status on creation

                // Set the phoneNumber field
                request.setPhoneNumber(phoneNumber);

                return swapRepo.save(request);
        }

        // Get incoming (pending) swap requests for a user
        public List<SkillSwapRequest> getSwapsForUser(User recipient) {
                return swapRepo.findByRecipientAndStatus(recipient, "PENDING");
        }

        // Get outgoing swap requests sent by user
        public List<SkillSwapRequest> getSentSwaps(User sender) {
                return swapRepo.findBySender(sender);
        }

        // Update status of swap request ("ACCEPTED" / "REJECTED")
        public SkillSwapRequest updateStatus(Long swapId, String status) {
                SkillSwapRequest request = swapRepo.findById(swapId)
                                .orElseThrow(() -> new RuntimeException("Swap request not found"));
                request.setStatus(status.toUpperCase());
                return swapRepo.save(request);
        }
}
