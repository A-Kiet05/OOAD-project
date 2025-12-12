package com.backend.mysticshop.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.mysticshop.domain.entities.AvalabilitySlots;
import com.backend.mysticshop.domain.enums.ReaderStatus;

@Repository
public interface AvailableSlotRepository extends JpaRepository<AvalabilitySlots, Integer>{
     
    List<AvalabilitySlots> findByReaderStatus(ReaderStatus readerStatus);

    List<AvalabilitySlots> findByReaderUserIDAndReaderStatus(Integer readerId , ReaderStatus readerStatus);
    
    @Query("""
      SELECT a 
      FROM AvalabilitySlots a
      WHERE a.reader.userID = :readerId
        AND a.date = :date
        AND a.slotID NOT IN (
            SELECT ap.avalabilitySlots.slotID 
            FROM Appointment ap
            WHERE ap.bookingDate = :date
              AND ap.startTime <= :endTime
              AND ap.endTime >= :startTime
         )
    """)
    List<AvalabilitySlots> findAvailableSlotByDateAndReaderId(@Param("readerId") Integer readerId,
                                                              @Param("date") LocalDate date,
                                                              @Param("startTime") LocalTime startTime,
                                                              @Param("endTime") LocalTime endTime
        );

        Optional<AvalabilitySlots> findByDateAndStartTimeAndEndTime(LocalDate date, LocalTime startTime, LocalTime endTime);

        @Query("SELECT s FROM AvalabilitySlots s " +
       "WHERE s.reader.userID = :readerId " +
       "AND s.date = :date " +
       // Điều kiện Giao nhau (Overlap Check) chuẩn: 
       // Slot_cũ.startTime < Slot_mới.endTime VÀ Slot_cũ.endTime > Slot_mới.startTime
       "AND (" +
           "(s.startTime < :newEndTime AND s.endTime > :newStartTime)" +
       ")")
        List<AvalabilitySlots> findOverlappingSlots(
            @Param("readerId") Integer readerId, 
            @Param("date") LocalDate date, 
            @Param("newStartTime") LocalTime newStartTime, 
            @Param("newEndTime") LocalTime newEndTime
        );
}