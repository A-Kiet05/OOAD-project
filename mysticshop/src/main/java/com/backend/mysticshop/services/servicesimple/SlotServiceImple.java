package com.backend.mysticshop.services.servicesimple;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.mysticshop.domain.dto.AvailableSlotDTO;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.dto.SlotRequest;
import com.backend.mysticshop.domain.entities.AvalabilitySlots;
import com.backend.mysticshop.domain.entities.User;
import com.backend.mysticshop.domain.enums.AppointmentStatus;
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
    @Transactional
    public Response createSlot(SlotRequest slotRequest){
           
        User user = userService.getLogin();
        if( user != null && !user.getRole().toString().equals("READER")){
            throw new IllegalArgumentException("Only Reader can create slots!");
        }

        // 🔴 LOGIC ĐÃ SỬA: Kiểm tra Slot giao nhau bằng hàm query chuẩn xác
        List<AvalabilitySlots> overlappingSlots = availableSlotRepository.findOverlappingSlots(
            user.getUserID(), 
            slotRequest.getDate(), 
            slotRequest.getStartTime(), 
            slotRequest.getEndTime()
        );

        if (!overlappingSlots.isEmpty()) { 
            // Nếu tìm thấy bất kỳ slot nào giao nhau
            throw new IllegalArgumentException("Slot already exists or overlaps with another slot for this reader and time!");
        }


        // 🔴 Bổ sung validate thời gian: Start phải trước End
        if(slotRequest.getEndTime().isBefore(slotRequest.getStartTime()) || slotRequest.getEndTime().equals(slotRequest.getStartTime())){
             throw new IllegalArgumentException("End Time must be after Start Time!");
        }

        AvalabilitySlots avalabilitySlots = new AvalabilitySlots();
        avalabilitySlots.setStartTime(slotRequest.getStartTime());
        avalabilitySlots.setEndTime(slotRequest.getEndTime());
        avalabilitySlots.setDate(slotRequest.getDate());
        avalabilitySlots.setReaderStatus(ReaderStatus.AVAILABLE);
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
            
            List<AvailableSlotDTO> slotDTOs = availableSlotRepository.findByReaderStatus(ReaderStatus.valueOf(status.toUpperCase()))
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
    @Transactional
    public Response updateSlot(Integer slotID , LocalDate date, LocalTime startTime , LocalTime endTime, String status){

        AvalabilitySlots slot = availableSlotRepository.findById(slotID).orElseThrow(() -> new NotFoundException("Not found desired slotID!"));
         
        // === LOGIC MỚI: CHECK BOOKING TRƯỚC KHI SỬA ===
        // Nếu định sửa thời gian (Date, StartTime, EndTime)
        if (date != null || startTime != null || endTime != null) {
            
            // Cách 1: Kiểm tra trạng thái Slot (Nhanh nhất)
            if (slot.getReaderStatus() == ReaderStatus.BOOKED) {
                throw new IllegalArgumentException("Cannot update time of a BOOKED slot. Please cancel the appointment first.");
            }

            // Cách 2: Kiểm tra danh sách Appointment (Chắc chắn nhất)
            // Giả sử Entity AvalabilitySlots có quan hệ @OneToMany với Appointment
            if (slot.getAppointments() != null && !slot.getAppointments().isEmpty()) {
                boolean hasActiveAppointment = slot.getAppointments().stream()
                        .anyMatch(app -> app.getAppointmentStatus() != AppointmentStatus.CANCELLED);
                
                if (hasActiveAppointment) {
                    throw new IllegalArgumentException("This slot has active appointments. Cannot modify time.");
                }
            }
        }

        //====================
        if(startTime != null)slot.setStartTime(startTime);
        if(endTime != null) slot.setEndTime(endTime);
        if(date != null) slot.setDate(date);
        if(status != null) slot.setReaderStatus(ReaderStatus.valueOf(status.toUpperCase()));
        availableSlotRepository.save(slot);

        return Response.builder()
                       .status(200)
                       .message("Updated Successfully !")
                       .build();
    }

    @Override
    @Transactional
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
             
             List<AvailableSlotDTO> slotDTOs = availableSlotRepository.findByReaderUserIDAndReaderStatus(readerID, ReaderStatus.valueOf(status.toUpperCase()))
                                                                      .stream()
                                                                      .map(availabilitySlotMapper::mapTo)
                                                                      .collect(Collectors.toList());
                                                                
            return Response.builder()
                           .status(200)
                           .availableSlotDTOList(slotDTOs)
                           .build();
    }

    @Override
    public Response findAvailableSlotByTimeAndReaderId(Integer readerID , LocalDate date, LocalTime startTime , LocalTime endTime ){
             
        User user = userRepository.findById(readerID).orElseThrow(() -> new NotFoundException("Reader not found !"));

        if( !user.getRole().toString().equals("READER")){
            throw new IllegalArgumentException("User is not a reader!");

        }

        List<AvailableSlotDTO> slotDTOs = availableSlotRepository.findAvailableSlotByDateAndReaderId(user.getUserID() , date , startTime , endTime)
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
