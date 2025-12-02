package com.backend.mysticshop.services.servicesimple;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.backend.mysticshop.domain.dto.AppointmentDTO;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.entities.Appointment;
import com.backend.mysticshop.domain.entities.AvalabilitySlots;
import com.backend.mysticshop.domain.entities.User;
import com.backend.mysticshop.domain.enums.AppointmentStatus;
import com.backend.mysticshop.exception.InvalidCredentialsException;
import com.backend.mysticshop.exception.NotFoundException;
import com.backend.mysticshop.mappers.Mapper;
import com.backend.mysticshop.repositories.AppointmentRepository;
import com.backend.mysticshop.repositories.AvailableSlotRepository;
import com.backend.mysticshop.repositories.UserRepository;
import com.backend.mysticshop.services.AppointmentService;
import com.backend.mysticshop.services.SlotService;
import com.backend.mysticshop.services.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AppointmentServiceImple implements AppointmentService {
    
    private final AppointmentRepository appointmentRepository;
    private final Mapper<Appointment , AppointmentDTO> appointmentMapper;
    private final UserRepository userRepository;
    private final AvailableSlotRepository availableSlotRepository;
    private final UserService userService;
    private final SlotService slotService;

    @Override
    public Response saveAppointment(Integer slotID  , Appointment appointmentRequest){
        
        
        if(appointmentRequest.getEndTime().isBefore(appointmentRequest.getStartTime())){
            throw new IllegalArgumentException("Start Time must come before End Time");
        }
        
        AvalabilitySlots avalabilitySlots = availableSlotRepository.findById(slotID).orElseThrow(() -> new NotFoundException("Slot with desired ID does not have!"));
        Response slotUpdatedStatus = slotService.updateSlot(slotID , null , null , "booked");

        if(slotUpdatedStatus.getStatus() != 200){
            throw new IllegalArgumentException("Slot is not available for booking !");
        }
        User user = userService.getLogin();

        if(user == null || user.getRole().toString().equals("READER")){
            throw new IllegalArgumentException("Only customer can create appointment!");
        }
        
        List<Appointment> existingAppointments = avalabilitySlots.getAppointments();
        if(!slotIsAvailable(appointmentRequest , existingAppointments)){
            throw new IllegalArgumentException("The Selected Time Slot is not available for booking !");
        }
        
        appointmentRequest.setCustomer(user);
        appointmentRequest.setAvalabilitySlots(avalabilitySlots);
        appointmentRequest.setAppointmentStatus(AppointmentStatus.CONFIRMED);
        appointmentRepository.save(appointmentRequest);
        return Response.builder()
                       .status(200)
                       .message("Save Appoinment Successfully !")
                       .build();




    }

    @Override
    public Response getAllAppointment(){
         
        List<Appointment> appointments = appointmentRepository.findAll(Sort.by(Sort.Direction.DESC , "appointmentID"));
        List<AppointmentDTO> appointmentDTOs = appointments.stream().map(appointmentMapper::mapTo).collect(Collectors.toList());
        return Response.builder()
                       .status(200)
                       .message("successful!")
                       .appointmentDTOList(appointmentDTOs)
                       .build();
    }

    @Override
    public  Response cancelAppointment(Integer appointmentID){
          
        appointmentRepository.findById(appointmentID).orElseThrow(() -> new NotFoundException("appoinment ID not found!"));
        appointmentRepository.deleteById(appointmentID);
        return Response.builder()
                       .status(200)
                       .message("deleted")
                       .build();
    }
    @Override
    public Response findAppointmentByStatus(String status){

        String normalizedStatus = status.trim().toUpperCase();
        List<Appointment> appoinments = appointmentRepository.findByAppointmentStatus(normalizedStatus);
        List<AppointmentDTO> appointmentDTOs = appoinments.stream().map(appointmentMapper::mapTo).collect(Collectors.toList());

        return Response.builder()
                       .status(200)
                       .appointmentDTOList(appointmentDTOs)
                       .build();


    }

    public boolean slotIsAvailable(Appointment appointmentRequest , List<Appointment> existingAppointmnents){

        return existingAppointmnents.stream()
                .noneMatch(existingAppointment ->
                        appointmentRequest.getStartTime().equals(existingAppointment.getStartTime())
                                || appointmentRequest.getEndTime().isBefore(existingAppointment.getEndTime())
                                || (appointmentRequest.getStartTime().isAfter(existingAppointment.getStartTime())
                                && appointmentRequest.getStartTime().isBefore(existingAppointment.getEndTime()))
                                || (appointmentRequest.getStartTime().isBefore(existingAppointment.getStartTime())

                                && appointmentRequest.getEndTime().equals(existingAppointment.getEndTime()))
                                || (appointmentRequest.getStartTime().isBefore(existingAppointment.getStartTime())

                                && appointmentRequest.getEndTime().isAfter(existingAppointment.getEndTime()))

                                || (appointmentRequest.getStartTime().equals(existingAppointment.getEndTime())
                                && appointmentRequest.getEndTime().equals(existingAppointment.getStartTime()))

                                || (appointmentRequest.getStartTime().equals(existingAppointment.getEndTime())
                                && appointmentRequest.getEndTime().equals(existingAppointment.getStartTime()))
                );
    }

}
