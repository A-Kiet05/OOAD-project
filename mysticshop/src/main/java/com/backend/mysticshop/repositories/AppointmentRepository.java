package com.backend.mysticshop.repositories;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.mysticshop.domain.entities.Appointment;
import com.backend.mysticshop.domain.enums.AppointmentStatus;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment , Integer> {
    
    Optional<Appointment> findByStartTimeAndEndTime(LocalTime startTime , LocalTime endTime);
    List<Appointment> findByAppointmentStatus(String status);
}
