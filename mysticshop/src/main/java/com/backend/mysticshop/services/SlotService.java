package com.backend.mysticshop.services;

import java.time.LocalTime;

import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.dto.SlotRequest;

public interface SlotService {
    
    Response createSlot(SlotRequest slotRequest);
    Response getAllSlots();
    Response findSlotsByStatus(String status);
    Response updateSlot(Integer slotID , LocalTime startTime , LocalTime endTime, String status);
    Response deleteSlot(Integer slotID);
    Response findSlotByReaderIdAndStatus(Integer readerID , String status);
    Response findAvailableSlotByTimeAndReaderId(LocalTime startTime , LocalTime endTime , Integer readerID );
    Response findSlotById(Integer slotID);

}
