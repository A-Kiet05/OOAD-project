package com.backend.mysticshop.services.servicesimple;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.mysticshop.domain.dto.AvailableSlotDTO;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.dto.SlotRequest;
import com.backend.mysticshop.domain.entities.AvalabilitySlots;
import com.backend.mysticshop.domain.entities.User;
import com.backend.mysticshop.domain.enums.ReaderStatus;
import com.backend.mysticshop.exception.NotFoundException;
import com.backend.mysticshop.mappers.Mapper;
import com.backend.mysticshop.repositories.AppointmentRepository;
import com.backend.mysticshop.repositories.AvailableSlotRepository;
import com.backend.mysticshop.repositories.UserRepository;
import com.backend.mysticshop.services.SlotService;
import com.backend.mysticshop.services.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class SlotServiceImple implements SlotService{
    
    private final AvailableSlotRepository availableSlotRepository;
    private final Mapper<AvalabilitySlots, AvailableSlotDTO> availabilitySlotMapper;
    private final AppointmentRepository appointmentRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    @Override
    public Response createSlot(SlotRequest slotRequest){
           
        User user = userService.getLogin();
        if( user != null && !user.getRole().toString().equals("READER")){
            throw new IllegalArgumentException("Only Reader can create slots!");
        }

        AvalabilitySlots avalabilitySlots = new AvalabilitySlots();
        avalabilitySlots.setStartTime(slotRequest.getStartTime());
        avalabilitySlots.setEndTime(slotRequest.getEndTime());
        avalabilitySlots.setReaderStatus(ReaderStatus.Available);
        avalabilitySlots.setReader(user);
        availableSlotRepository.save(avalabilitySlots);

        return Response.builder()               
                       .status(200)
                       .message("Created Successfully !")
                       .build();

    }
    
    @Override
    public Response getAllSlots(){
             List<AvalabilitySlots> slots = availableSlotRepository.findAll();
             List<AvailableSlotDTO> slotDTOs = slots.stream().map(availabilitySlotMapper::mapTo).collect(Collectors.toList());

             return Response.builder()      
                            .status(200)
                            .availableSlotDTOList(slotDTOs)
                            .build();
    }

    @Override
    public Response findSlotsByStatus(String status){
            String normalizedStatus = status.trim().toUpperCase();
            List<AvailableSlotDTO> slotDTOs = availableSlotRepository.findByReaderStatus(normalizedStatus)
                                                                     .stream()
                                                                     .map(availabilitySlotMapper::mapTo)
                                                                     .collect(Collectors.toList());
            
            return Response.builder()
                           .status(200)
                           .message("Success!")
                           .availableSlotDTOList(slotDTOs)
                           .build();
    }

    @Override
    public Response updateSlot(Integer slotID , LocalTime startTime , LocalTime endTime, String status){

        AvalabilitySlots slot = availableSlotRepository.findById(slotID).orElseThrow(() -> new NotFoundException("Not found desired slotID!"));

        if(startTime != null)slot.setStartTime(startTime);
        if(endTime != null) slot.setEndTime(endTime);
        if(status != null) slot.setReaderStatus(ReaderStatus.valueOf(status.toUpperCase()));
        availableSlotRepository.save(slot);

        return Response.builder()
                       .status(200)
                       .message("Updated Successfully !")
                       .build();
    }

    @Override
    public Response deleteSlot(Integer slotID){
       
        availableSlotRepository.findById(slotID).orElseThrow(()-> new NotFoundException("Slot Desired Not Found!"));
        availableSlotRepository.deleteById(slotID);

        return Response.builder() 
                       .status(200)
                       .message("Deleted Successfully!")
                       .build();

    }

    @Override
    public Response findSlotByReaderIdAndStatus(Integer readerID , String status){
             String normalizedStatus = status.trim().toUpperCase();
             List<AvailableSlotDTO> slotDTOs = availableSlotRepository.findByReaderUserIDAndReaderStatus(readerID, normalizedStatus)
                                                                      .stream()
                                                                      .map(availabilitySlotMapper::mapTo)
                                                                      .collect(Collectors.toList());
                                                                
            return Response.builder()
                           .status(200)
                           .availableSlotDTOList(slotDTOs)
                           .build();
    }

    @Override
    public Response findAvailableSlotByTimeAndReaderId(LocalTime startTime , LocalTime endTime , Integer readerID ){
             
        User user = userRepository.findById(readerID).orElseThrow(() -> new NotFoundException("Reader not found !"));

        if( !user.getRole().toString().equals("READER")){
            throw new IllegalArgumentException("User is not a reader!");

        }

        List<AvailableSlotDTO> slotDTOs = availableSlotRepository.findAvailableSlotByDateAndReaderId(startTime, endTime, user.getUserID())
                                                                 .stream()
                                                                 .map(availabilitySlotMapper::mapTo)
                                                                 .collect(Collectors.toList());

        return Response.builder()
                       .status(200)
                       .availableSlotDTOList(slotDTOs)
                       .build();

    }

    @Override 
    public Response findSlotById(Integer slotID){
        AvalabilitySlots slot = availableSlotRepository.findById(slotID).orElseThrow(() -> new NotFoundException("Slot not found !"));
        AvailableSlotDTO slotDTO = availabilitySlotMapper.mapTo(slot);
         return Response.builder()
                        .status(200)
                        .availableSlotDTO(slotDTO)
                        .build();
    }

}
