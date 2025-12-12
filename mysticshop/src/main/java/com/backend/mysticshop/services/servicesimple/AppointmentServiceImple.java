package com.backend.mysticshop.services.servicesimple;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.mysticshop.domain.dto.AppointmentDTO;
import com.backend.mysticshop.domain.dto.AppointmentRequest;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.entities.Appointment;
import com.backend.mysticshop.domain.entities.AvalabilitySlots;
import com.backend.mysticshop.domain.entities.User;
import com.backend.mysticshop.domain.enums.AppointmentStatus;
import com.backend.mysticshop.domain.enums.ReaderStatus;
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
    @Transactional
    public Response saveAppointment(AppointmentRequest appointmentRequest) {
        
        // 1. Validate Time
        if(appointmentRequest.getEndTime().isBefore(appointmentRequest.getStartTime())){
            throw new IllegalArgumentException("Start Time must come before End Time");
        }
        
        // 2. Validate User
        User user = userService.getLogin();
        if(user == null || "READER".equals(user.getRole().toString())){
             throw new IllegalArgumentException("Only customer can create appointment!");
        }

        // 3. Tìm Slot theo Date/Time
        // Lưu ý: Logic này giả định 1 khung giờ chỉ có 1 slot duy nhất.
        AvalabilitySlots avalabilitySlot = availableSlotRepository
        .findByDateAndStartTimeAndEndTime(
            appointmentRequest.getBookingDate(), 
            appointmentRequest.getStartTime(), 
            appointmentRequest.getEndTime()
        )
        .orElseThrow(() -> new NotFoundException("Slot with desired date and time does not exist!"));
       
        // 4. Kiểm tra xem Slot đã bị đặt chưa
        boolean isSlotBooked = false;
        
        // Cách 1: Check status trực tiếp của Slot (Nhanh và chuẩn nhất)
        if (avalabilitySlot.getReaderStatus() == ReaderStatus.BOOKED) {
            isSlotBooked = true;
        } 
        // Cách 2: Check list appointment (như code cũ của bạn - để chắc chắn)
        else {
             List<Appointment> existingAppointments = avalabilitySlot.getAppointments();
             if (existingAppointments != null && !existingAppointments.isEmpty()) {
                 // Nếu đã có appointment nào đó confirmed/completed trong slot này
                 boolean hasActiveAppt = existingAppointments.stream()
                     .anyMatch(a -> a.getAppointmentStatus() != AppointmentStatus.CANCELLED);
                 if (hasActiveAppt) isSlotBooked = true;
             }
        }

        // 5. Xử lý khi Slot đã bị đặt -> Gợi ý slot khác
        if (isSlotBooked) {
            Integer suggestedSlotId = findNextAvailableSlot(avalabilitySlot); // Logic tối ưu hơn
            String message = "Slot for desired time is not available!";
            
            if (suggestedSlotId != null) {
                message += " We suggest the nearest available slot: ID " + suggestedSlotId;
                return Response.builder()
                        .status(409) // 409 Conflict
                        .message(message)
                        .nearestSlotID(suggestedSlotId)
                        .build();
            } else {
                throw new IllegalArgumentException("The Selected Time Slot is not available and no nearby slots were found!");
            }
        }
        
        // 6. Thực hiện Booking (Happy Path)
        
        // Update trạng thái Slot thành BOOKED
        // Không cần gọi SlotService.updateSlot, thao tác trực tiếp trên Entity trong Transaction
        avalabilitySlot.setReaderStatus(ReaderStatus.BOOKED);
        availableSlotRepository.save(avalabilitySlot); 

        // Tạo Appointment
        Appointment appointment = new Appointment();
        appointment.setCustomer(user);
        appointment.setAvalabilitySlots(avalabilitySlot);
        appointment.setAppointmentStatus(AppointmentStatus.CONFIRMED);
        appointment.setBookingDate(appointmentRequest.getBookingDate());
        appointment.setStartTime(appointmentRequest.getStartTime());
        appointment.setEndTime(appointmentRequest.getEndTime());
        appointment.setNotes(appointmentRequest.getNotes()); // Nếu có notes

        appointmentRepository.save(appointment);

        return Response.builder()
                .status(200)
                .message("Save Appointment Successfully!")
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
    @Transactional
    public Response updateAppointment(Integer appointmentID , LocalDate  bookingDate , LocalTime startTime , LocalTime endTime , String notes , String status){

        Appointment appointment= appointmentRepository.findById(appointmentID).orElseThrow(() -> new NotFoundException("appoinment ID not found!"));
        
        if(bookingDate!= null)appointment.setBookingDate(bookingDate);
        if(startTime != null)appointment.setStartTime(startTime);
        if(endTime != null) appointment.setEndTime(endTime);
        if(notes != null) appointment.setNotes(notes);
        if(status != null) appointment.setAppointmentStatus(AppointmentStatus.valueOf(status.toUpperCase()));

        appointmentRepository.save(appointment);

          return Response.builder()
                       .status(200)
                       .message("Updated Successfully!")
                       .build();
        
    }


    @Override
    public  Response cancelAppointment(Integer appointmentID){
          
       Appointment appointment= appointmentRepository.findById(appointmentID).orElseThrow(() -> new NotFoundException("appoinment ID not found!"));
       AvalabilitySlots slot = appointment.getAvalabilitySlots();
       slot.setReaderStatus(ReaderStatus.AVAILABLE);
       availableSlotRepository.save(slot);

       appointment.setAppointmentStatus(AppointmentStatus.CANCELLED);
       appointmentRepository.save(appointment);
       
        return Response.builder()
                       .status(200)
                       .message("Cancelled Successfully!")
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

    @Override
    public  Response deleteAppointment(Integer appointmentID){
          
      appointmentRepository.findById(appointmentID).orElseThrow(() -> new NotFoundException("appoinment ID not found!"));
      appointmentRepository.deleteById(appointmentID);
        return Response.builder()
                       .status(200)
                       .message("Deleted Successfully!")
                       .build();
    }

    public boolean slotIsAvailable(AppointmentRequest appointmentRequest , List<Appointment> existingAppointmnents){

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

    private Integer findNextAvailableSlot(AvalabilitySlots currentSlot) {
        // Thay vì loop ID (vì ID có thể không liên tục hoặc slot ID kế tiếp lại thuộc về Reader khác/Ngày khác)
        // Hãy tìm slot tiếp theo của CÙNG READER, trong CÙNG NGÀY (hoặc tương lai), có trạng thái AVAILABLE
        
        // Giả sử bạn có method repository này (nên thêm vào AvailableSlotRepository):
        // findFirstByReaderAndDateAndStartTimeAfterAndReaderStatusOrderByStartTimeAsc(...)
        
        // Dưới đây là logic giả lập sử dụng DB query thay vì loop tay:
        List<AvalabilitySlots> nextSlots = availableSlotRepository.findAvailableSlotByDateAndReaderId(
            currentSlot.getReader().getUserID(),
            currentSlot.getDate(),
            currentSlot.getEndTime(), // Tìm sau giờ kết thúc của slot hiện tại
            LocalTime.MAX // Đến hết ngày
        );

        if (!nextSlots.isEmpty()) {
            return nextSlots.get(0).getSlotID(); // Lấy slot đầu tiên tìm thấy
        }
        
        return null;
    }
}


