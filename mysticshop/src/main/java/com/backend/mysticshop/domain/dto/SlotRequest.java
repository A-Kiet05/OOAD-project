package com.backend.mysticshop.domain.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.backend.mysticshop.domain.enums.ReaderStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SlotRequest {
    
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private ReaderStatus readerStatus;
    
}
