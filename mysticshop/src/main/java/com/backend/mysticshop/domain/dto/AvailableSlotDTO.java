package com.backend.mysticshop.domain.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import com.backend.mysticshop.domain.entities.Appointment;
import com.backend.mysticshop.domain.enums.ReaderStatus;
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
public class AvailableSlotDTO {
    
    private Integer slotID; 
  private LocalDate date;  
    private LocalTime startTime;
    private LocalTime endTime;
    private ReaderStatus readerStatus;
    private UserDTO reader;
    private Appointment appointment;
}
