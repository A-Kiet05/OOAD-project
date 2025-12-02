package com.backend.mysticshop.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.entities.Appointment;
import com.backend.mysticshop.services.AppointmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {
     
    private final AppointmentService appointmentService;


    @PostMapping("/create-appointment/{slotId}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<Response> createAppointment(@PathVariable Integer slotId , 
                                                      @RequestBody Appointment appointmentRequest)
    {
           return ResponseEntity.ok(appointmentService.saveAppointment(slotId , appointmentRequest));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('READER')")
    public ResponseEntity<Response> getAllAppointments(){
        return ResponseEntity.ok(appointmentService.getAllAppointment());
    }
   
    @GetMapping("/get-by-status")
    public ResponseEntity<Response> getAppointmentByStatus(@RequestParam (required = true) String status){
        return ResponseEntity.ok(appointmentService.findAppointmentByStatus(status));
    }

    @DeleteMapping("/cancel-appointment/{appointmentID}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<Response> cancelAppoinment(@PathVariable Integer appointmentID){
        return ResponseEntity.ok(appointmentService.cancelAppointment(appointmentID));
    }

}
