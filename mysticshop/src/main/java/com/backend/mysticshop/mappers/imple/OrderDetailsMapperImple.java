package com.backend.mysticshop.mappers.imple;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.backend.mysticshop.domain.dto.OrderDTO;
import com.backend.mysticshop.domain.dto.OrderDetailsDTO;
import com.backend.mysticshop.domain.entities.Order;
import com.backend.mysticshop.domain.entities.OrderDetails;
import com.backend.mysticshop.mappers.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OrderDetailsMapperImple implements Mapper<OrderDetails , OrderDetailsDTO> {
    
     private final ModelMapper modelMapper;
     

    @Override
    public OrderDetailsDTO mapTo(OrderDetails orderDetails){
           return modelMapper.map(orderDetails , OrderDetailsDTO.class);
    }

    public OrderDetails mapFrom(OrderDetailsDTO orderDetailsDTO){
        return modelMapper.map(orderDetailsDTO , OrderDetails.class);
    }

}
