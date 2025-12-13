package com.backend.mysticshop.mappers.imple;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.backend.mysticshop.domain.dto.CategoryDTO;
import com.backend.mysticshop.domain.entities.Category;
import com.backend.mysticshop.mappers.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CategoryMapperImple implements Mapper<Category , CategoryDTO> {
  
    private final ModelMapper modelMapper;

    @Override
    public CategoryDTO mapTo(Category category){
        return modelMapper.map(category, CategoryDTO.class);
    }

    @Override
    public Category mapFrom(CategoryDTO categoryDTO){
        return modelMapper.map(categoryDTO, Category.class);
    }
    
}
