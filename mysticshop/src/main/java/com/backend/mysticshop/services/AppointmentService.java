package com.backend.mysticshop.services;

import java.time.LocalDate;
import java.time.LocalTime;

import com.backend.mysticshop.domain.dto.AppointmentDTO;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.entities.Appointment;
import com.backend.mysticshop.domain.enums.AppointmentStatus;

public interface AppointmentService {
    
    Response saveAppointment ( Appointment appointmentRequest);
    Response getAllAppointment();
    Response cancelAppointment(Integer appointmentID);
    Response findAppointmentByStatus(String status);
    Response deleteAppointment(Integer appointmentID);
    Response updateAppointment(Integer appoinmentID , LocalDate  bookingDate , LocalTime startTime , LocalTime endTime , String notes , String status);
   
}
