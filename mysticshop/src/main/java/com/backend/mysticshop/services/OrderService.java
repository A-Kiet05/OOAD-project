package com.backend.mysticshop.services;

import com.backend.mysticshop.domain.entities.Order;

public interface OrderService {
    
    Order createOrder(Order order);
}
