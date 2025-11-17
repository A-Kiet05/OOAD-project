package com.backend.mysticshop.mappers.imple;


import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


import com.backend.mysticshop.domain.dto.OrderDTO;
import com.backend.mysticshop.domain.entities.Order;
import com.backend.mysticshop.mappers.Mapper;

@Component
public class OrderMapperImple implements Mapper<Order, OrderDTO>{
    
     private ModelMapper modelMapper;
     public OrderMapperImple(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
     }

    @Override
    public OrderDTO mapTo(Order order){
           return modelMapper.map(order , OrderDTO.class);
    }

    public Order mapFrom(OrderDTO orderDTO){
        return modelMapper.map(orderDTO , Order.class);
    }
}
