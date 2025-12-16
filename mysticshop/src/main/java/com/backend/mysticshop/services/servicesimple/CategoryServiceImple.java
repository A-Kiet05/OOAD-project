package com.backend.mysticshop.services.servicesimple;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.backend.mysticshop.domain.dto.CategoryDTO;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.entities.Category;
import com.backend.mysticshop.exception.NotFoundException;
import com.backend.mysticshop.mappers.Mapper;
import com.backend.mysticshop.repositories.CategoryRepository;

import com.backend.mysticshop.services.CategoryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryServiceImple implements CategoryService {
    
    
    private final CategoryRepository categoryRepository;
    private final Mapper<Category , CategoryDTO> cateMapper;

    @Override
    public Response createCategory(CategoryDTO categoryDTO){
          
        Category category = new Category();
        category.setName(categoryDTO.getName());
        categoryRepository.save(category);

        return Response.builder()
                       .status(200)
                       .message("Created Successfully")
                       .build();
    }

    @Override
    public Response getAll(){
              
        List<CategoryDTO> categoryDTOs = categoryRepository.findAll(Sort.by(Sort.Direction.DESC  , "categoryID"))
                                                           .stream()
                                                           .map(cateMapper::mapTo)
                                                           .collect(Collectors.toList());
                                        
                     return Response.builder()
                                    .status(200)
                                    .categoryDTOs(categoryDTOs)
                                    .build();
    }

    @Override
    public Response getCategoryById(Integer categoryId){
  

        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new NotFoundException("category not found !"));
        CategoryDTO categoryDTO = cateMapper.mapTo(category);

        return Response.builder()
                       .status(200)
                       .categoryDTO(categoryDTO)
                       .build();
    }

    @Override
    public Response updateCategory(Integer id , CategoryDTO categoryDTO){
          
        Category category = categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("category not found !"));
        
        if(categoryDTO.getName() != null) category.setName(categoryDTO.getName());

        categoryRepository.save(category);
           
        return Response.builder()
                       .status(200)
                       .message("Updated Successfully")
                       .build();
        
    }

    @Override
    public Response deleteCategory(Integer id){
          
         categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("category not found !"));
         categoryRepository.deleteById(id);

        return Response.builder()
                       .status(200)
                       .message("Deleted Successfully")
                       .build();
    }
}
