package com.backend.mysticshop.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.mysticshop.domain.dto.OrderDTO;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.entities.Order;
import com.backend.mysticshop.mappers.Mapper;
import com.backend.mysticshop.services.OrderService;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    
    private final OrderService orderService;

    // @PostMapping()
    // public ResponseEntity<OrderDTO> createOrder(@RequestBody Order order){
    //     return ResponseEntity.ok(orderService.createOrder(order));
    // }
   
}
