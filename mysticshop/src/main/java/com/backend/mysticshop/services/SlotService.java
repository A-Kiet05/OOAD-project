package com.backend.mysticshop.services;

import java.time.LocalDate;
import java.time.LocalTime;

import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.dto.SlotRequest;

public interface SlotService {
    
    Response createSlot(SlotRequest slotRequest);
    Response getAllSlots();
    Response findSlotsByStatus(String status);
    Response updateSlot(Integer slotID ,LocalDate date ,  LocalTime startTime , LocalTime endTime, String status);
    Response deleteSlot(Integer slotID);
    Response findSlotByReaderIdAndStatus( Integer readerId ,String status);
    Response findAvailableSlotByTimeAndReaderId(Integer readerId , LocalDate date , LocalTime starTime , LocalTime endTime );
    Response findSlotById(Integer slotID);
    Response findSlotByReaderAndStatus(String status);

}
