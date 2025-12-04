package com.backend.mysticshop.services.servicesimple;

import java.util.List;
import java.util.Optional;
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

        boolean isSlotBooked = false;
        Response slotUpdatedStatus = slotService.updateSlot(slotID , null , null , null , "booked");
        User user = userService.getLogin();

        if(user == null || user.getRole().toString().equals("READER")){
            throw new IllegalArgumentException("Only customer can create appointment!");
        }

        if(slotUpdatedStatus.getStatus() != 200){

            isSlotBooked = true;
        }else {
            
            List<Appointment> existingAppointments = avalabilitySlots.getAppointments();
            if (!slotIsAvailable(appointmentRequest, existingAppointments)) {
                isSlotBooked = true;
                
            }
        }

        if (isSlotBooked) {
            
            Integer suggestedSlotId = findNextAvailableSlot(slotID);
            String message = "Slot for desired time is not available !";
            if (suggestedSlotId != null) {
                
                message += "we suggest the nearest available slot : ID " + suggestedSlotId;
                return Response.builder()
                        .status(409) // Conflict : Slot has been booked
                        .message(message)
                        .nearestSlotID(suggestedSlotId)
                        .build();
            } else {
                throw new IllegalArgumentException("The Selected Time Slot is not available and no nearby slots were found!");
            }
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

    private Integer findNextAvailableSlot(Integer currentSlotId) {
        int attempt = 1;
        int maxAttempts = 10; // find in next 10 slots to save perform

        while (attempt <= maxAttempts) {
            Integer nextId = currentSlotId + attempt;
            Optional<AvalabilitySlots> nextSlotOpt = availableSlotRepository.findById(nextId);

            if (nextSlotOpt.isPresent()) {
                AvalabilitySlots nextSlot = nextSlotOpt.get();
                
                
                boolean isFree = false;
                // Kiểm tra status của slot (Giả sử getter là getReaderStatus hoặc getStatus)
                if (nextSlot.getReaderStatus() != null && 
                    nextSlot.getReaderStatus().toString().equalsIgnoreCase("AVAILABLE")) {
                    isFree = true;
                }

                // Nếu status OK, kiểm tra tiếp xem có bị full lịch không (nếu 1 slot chứa nhiều appointment)
                // Nếu quy tắc là 1 slot = 1 appointment thì chỉ cần check status là đủ.
                // Nếu 1 slot cho phép nhiều người đặt, cần check existingAppointments như hàm slotIsAvailable.
                
                if (isFree) {
                    return nextId;
                }
            }
            attempt++;
        }
        return null; 
    }

}
