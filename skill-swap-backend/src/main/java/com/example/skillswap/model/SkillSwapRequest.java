package com.example.skillswap.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "skill_swap_requests")
public class SkillSwapRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private User recipient;

    private String requestedSkill;
    private String desiredSkill;
    private LocalDateTime proposedDateTime;
    private String status;
    private String feedback;

    // New field for phone number
    private String phoneNumber;

    public SkillSwapRequest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getRecipient() {
        return recipient;
    }

    public void setRecipient(User recipient) {
        this.recipient = recipient;
    }

    public String getRequestedSkill() {
        return requestedSkill;
    }

    public void setRequestedSkill(String requestedSkill) {
        this.requestedSkill = requestedSkill;
    }

    public String getDesiredSkill() {
        return desiredSkill;
    }

    public void setDesiredSkill(String desiredSkill) {
        this.desiredSkill = desiredSkill;
    }

    public LocalDateTime getProposedDateTime() {
        return proposedDateTime;
    }

    public void setProposedDateTime(LocalDateTime proposedDateTime) {
        this.proposedDateTime = proposedDateTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    // Getter for phoneNumber
    public String getPhoneNumber() {
        return phoneNumber;
    }

    // Setter for phoneNumber
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}