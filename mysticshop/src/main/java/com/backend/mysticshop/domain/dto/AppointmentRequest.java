package com.backend.mysticshop.domain.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class AppointmentRequest {
    
    private Integer readerId;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String notes;
}
