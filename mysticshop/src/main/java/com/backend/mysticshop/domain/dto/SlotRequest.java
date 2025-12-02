package com.backend.mysticshop.domain.dto;

import java.time.LocalTime;

import com.backend.mysticshop.domain.enums.ReaderStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SlotRequest {
    private LocalTime startTime;
    private LocalTime endTime;
    
}
