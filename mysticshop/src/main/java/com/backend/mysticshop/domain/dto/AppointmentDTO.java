package com.backend.mysticshop.domain.dto;

import java.time.LocalDate;

import com.backend.mysticshop.domain.entities.AvalabilitySlots;
import com.backend.mysticshop.domain.enums.AppointmentStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor

public class AppointmentDTO {
    
    
    private Integer appointmentID; 
    private LocalDate startTime;
    private LocalDate endTime;
    private AppointmentStatus appointmentStatus;
    private String notes;
    private AvalabilitySlots avalabilitySlots;
    private UserDTO customer;
}
