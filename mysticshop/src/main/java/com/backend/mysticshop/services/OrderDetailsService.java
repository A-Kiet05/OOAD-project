package com.backend.mysticshop.services;

import java.time.LocalDateTime;

import org.springframework.data.domain.Pageable;

import com.backend.mysticshop.domain.dto.OrderDetailsRequest;
import com.backend.mysticshop.domain.dto.OrderRequest;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.enums.OrderStatus;

public interface OrderDetailsService {
    
    Response placeOrder(OrderRequest orderRequest);
    Response updateOrderDetailStatus (Integer orderDetailsId , String status);
    Response filterOrderDetails(OrderStatus status ,LocalDateTime startDate , LocalDateTime endDate , Integer itemId , Pageable pageable );

}
