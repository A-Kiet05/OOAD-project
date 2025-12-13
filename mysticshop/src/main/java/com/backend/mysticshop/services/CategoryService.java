package com.backend.mysticshop.services;

import com.backend.mysticshop.domain.dto.CategoryDTO;
import com.backend.mysticshop.domain.dto.Response;

public interface CategoryService {
    
    Response createCategory(CategoryDTO categoryDTO);
    Response getAll();
    Response getCategoryById(Integer id);
    Response updateCategory(Integer id , CategoryDTO categoryDTO);
    Response deleteCategory(Integer id);
}
