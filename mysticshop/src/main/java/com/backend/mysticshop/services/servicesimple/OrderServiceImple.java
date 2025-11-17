package com.backend.mysticshop.services.servicesimple;

import org.springframework.stereotype.Service;

import com.backend.mysticshop.domain.entities.Order;
import com.backend.mysticshop.repositories.OrderRepository;
import com.backend.mysticshop.services.OrderService;

import io.swagger.v3.oas.annotations.servers.Server;

@Service
public class OrderServiceImple implements OrderService{
    
    private OrderRepository orderRepository;
    public OrderServiceImple(OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }
    @Override
    public Order createOrder(Order order){
        return orderRepository.save(order);
    }
}
