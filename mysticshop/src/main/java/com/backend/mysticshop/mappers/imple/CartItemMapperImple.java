package com.backend.mysticshop.mappers.imple;

import org.hibernate.annotations.Comment;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.backend.mysticshop.domain.dto.CartItemsDTO;
import com.backend.mysticshop.domain.entities.CartItems;
import com.backend.mysticshop.mappers.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CartItemMapperImple implements Mapper<CartItems , CartItemsDTO> {
    
    private final ModelMapper modelMapper;

    @Override
    public CartItemsDTO mapTo(CartItems cartItems){
        return modelMapper.map(cartItems, CartItemsDTO.class);
    }

    @Override
    public CartItems mapFrom(CartItemsDTO cartItemsDTO){
        return modelMapper.map(cartItemsDTO, CartItems.class);
    }
}
