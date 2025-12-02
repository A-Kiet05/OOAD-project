package com.backend.mysticshop.services;

import com.backend.mysticshop.domain.dto.AppointmentDTO;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.entities.Appointment;

public interface AppointmentService {
    
    Response saveAppointment(Integer slotID , Appointment appointmentRequest);
    Response getAllAppointment();
    Response cancelAppointment(Integer appointmentID);
    Response findAppointmentByStatus(String status);
   
}
