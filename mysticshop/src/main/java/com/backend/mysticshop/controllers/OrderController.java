package com.backend.mysticshop.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.backend.mysticshop.domain.dto.OrderDTO;
import com.backend.mysticshop.domain.entities.Order;
import com.backend.mysticshop.mappers.Mapper;
import com.backend.mysticshop.services.OrderService;



@RestController
public class OrderController {
    
    private OrderService orderService;
    private Mapper<Order, OrderDTO> orderMapper;

    public OrderController(OrderService orderService , Mapper<Order, OrderDTO> orderMapper){
        this.orderMapper = orderMapper;
        this.orderService = orderService;
    }

    
    @PostMapping(path ="/orders")
    public ResponseEntity<OrderDTO> createOrder( @RequestHeader OrderDTO orderDTO){
           Order order = orderMapper.mapFrom(orderDTO);
           Order savedOrder  = orderService.createOrder(order);
           return new ResponseEntity<>(orderMapper.mapTo((savedOrder)) , HttpStatus.CREATED);
    }
}
