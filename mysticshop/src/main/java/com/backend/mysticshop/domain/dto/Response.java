package com.backend.mysticshop.domain.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class Response {
    
    private int status;
    private String message;
    private final LocalDateTime timestamp= LocalDateTime.now();


    private String token;
    private String role;
    private String expirationTime;

    private int totalPages;
    private long totalElement;
    

    private UserDTO user;
    private List<UserDTO> userList ;

    private ProductDTO product;
    private List<ProductDTO> productList ;

    private OrderDetailsDTO orderDetail;
    private List<OrderDetailsDTO> orderDetailList ;

    private OrderDTO order;
    private List<OrderDTO> orderList ;

    private AppointmentDTO appointment;
    private List<AppointmentDTO> appointmentDTOList;

    private AvailableSlotDTO availableSlotDTO;
    private List<AvailableSlotDTO> availableSlotDTOList;

    private ReaderProfileDTO readerProfileDTO;
    private List<ReaderProfileDTO> readerProfileDTOList;
}
