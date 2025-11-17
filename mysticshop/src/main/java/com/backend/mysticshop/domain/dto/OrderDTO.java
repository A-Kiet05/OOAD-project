package com.backend.mysticshop.domain.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.backend.mysticshop.domain.entities.User;
import com.backend.mysticshop.domain.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor

public class OrderDTO {
    
    private Integer orderID;
    private  LocalDateTime orderDate;
    private OrderStatus status;
    private String shippingAddress;
    private List<OrderDetailsDTO> orderDetails = new ArrayList<>();
   
}
