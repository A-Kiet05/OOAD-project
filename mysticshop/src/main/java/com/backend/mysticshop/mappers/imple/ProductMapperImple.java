package com.backend.mysticshop.mappers.imple;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.backend.mysticshop.domain.dto.ProductDTO;

import com.backend.mysticshop.domain.entities.Product;

import com.backend.mysticshop.mappers.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProductMapperImple implements Mapper<Product , ProductDTO> {
    
      private final  ModelMapper modelMapper;

    
    @Override
    public ProductDTO mapTo(Product product){
        return modelMapper.map(product , ProductDTO.class);
    }

    @Override
    public Product mapFrom(ProductDTO productDTO){
        return modelMapper.map(productDTO , Product.class);
    }
    
}
