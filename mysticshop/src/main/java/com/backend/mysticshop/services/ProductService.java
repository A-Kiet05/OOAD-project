package com.backend.mysticshop.services;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

import com.backend.mysticshop.domain.dto.Response;

public interface ProductService {
    

    Response createProduct(MultipartFile image , String name , String description , BigDecimal price , Integer stockQuantity);

    Response updateProduct(Integer productID , MultipartFile image , String name , String description , BigDecimal price , Integer stockQuantity);

    Response deleteProduct(Integer productID);

    Response findProductById(Integer productID);
    Response getAllProducts();

    Response searchProduct(String searchValue);

}
