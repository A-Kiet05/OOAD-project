package com.backend.mysticshop.controllers;

import java.time.LocalDateTime;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.mysticshop.domain.dto.OrderRequest;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.enums.OrderStatus;
import com.backend.mysticshop.services.OrderDetailsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/order-details")
@RequiredArgsConstructor
public class OrderDetailController {
    
    private final OrderDetailsService orderDetailsService;
    
    @PostMapping("/place-order")
    public ResponseEntity<Response> placeOrder(@RequestBody OrderRequest orderRequest){
         return ResponseEntity.ok(orderDetailsService.placeOrder(orderRequest));
    }
    
    @PutMapping("/update-orderDetails/{orderDetailsId}")
    @PreAuthorize("hasAuthority('READER')")
    public ResponseEntity<Response> updateOrderDetailsStatus(@PathVariable Integer orderDetailsId, @RequestParam (required = true) String status ){
         
        return ResponseEntity.ok(orderDetailsService.updateOrderDetailStatus(orderDetailsId , status));
    }

    @GetMapping("/filter-orderDetails")
    @PreAuthorize("hasAuthority('READER')")
    public ResponseEntity<Response> filterOrderDetails(
        @RequestParam (required = false) String status ,
        @RequestParam (required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
        @RequestParam (required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
        @RequestParam (required = false) Integer itemId,
        @RequestParam (defaultValue = "0") int page,
        @RequestParam (defaultValue = "1000") int size
    ){
        Pageable pageable = PageRequest.of(page , size , Sort.by(Sort.Direction.DESC , "orderDetailID"));
        OrderStatus orderStatus = status != null ? OrderStatus.valueOf(status.toUpperCase()) : null;

        return ResponseEntity.ok(orderDetailsService.filterOrderDetails(orderStatus, startDate, endDate, itemId, pageable));
    }

}
