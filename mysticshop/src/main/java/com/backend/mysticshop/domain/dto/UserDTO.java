package com.backend.mysticshop.domain.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.backend.mysticshop.domain.entities.AIChatSession;
import com.backend.mysticshop.domain.entities.Appointment;
import com.backend.mysticshop.domain.entities.AvalabilitySlots;
import com.backend.mysticshop.domain.entities.CartItems;
import com.backend.mysticshop.domain.entities.Order;
import com.backend.mysticshop.domain.entities.ReaderProfiles;
import com.backend.mysticshop.domain.entities.Review;
import com.backend.mysticshop.domain.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor

public class UserDTO {
    
    private Integer userID;
    private String username;
    private String email;
    private String passwordHash;
    private UserRole role;
    private LocalDateTime createdAt;
    private Boolean isEmailVerified;
    private List<OrderDetailsDTO> ordersDetailsDTOs = new ArrayList<>(); //use for search order history 
    // private ReaderProfileDTO readerProfiles;
    // private List<ReviewDTO> reviews = new ArrayList<>();
    // private List<CartItemsDTO> cartItems = new ArrayList<>();
    // private List<AIChatSessionDTO> aiChatSessions = new ArrayList<>();
    // private List<AvailableSlotDTO> avalabilitySlots = new ArrayList<>();
    // private Set<AppointmentDTO> appointments;
}
