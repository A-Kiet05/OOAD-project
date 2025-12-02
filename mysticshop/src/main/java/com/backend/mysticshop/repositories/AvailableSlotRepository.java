package com.backend.mysticshop.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.mysticshop.domain.entities.AvalabilitySlots;
import com.backend.mysticshop.domain.enums.ReaderStatus;

@Repository
public interface AvailableSlotRepository extends JpaRepository<AvalabilitySlots, Integer>{
     
    List<AvalabilitySlots> findByReaderStatus(String status);

    List<AvalabilitySlots> findByReaderUserIDAndReaderStatus(Integer readerId , String status);
    
    @Query("SELECT a FROM AvalabilitySlots a WHERE a.reader.userID = :readerId AND a.slotID NOT IN (SELECT ap.avalabilitySlots.slotID FROM Appointment ap WHERE" +
            "(ap.startTime <= :endTime) AND (ap.endTime >= :startTime))" )
    List<AvalabilitySlots> findAvailableSlotByDateAndReaderId(LocalTime startTime , LocalTime endTime , Integer readerId );
}