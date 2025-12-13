package com.backend.mysticshop.services;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

import com.backend.mysticshop.domain.dto.Response;

public interface ProductService {
    

    Response createProduct( String name , String description , BigDecimal price , Integer stockQuantity ,  String imageUrl , String backgroundUrl , Integer categoryId);

    Response updateProduct(Integer productID ,  String name , String description , BigDecimal price , Integer stockQuantity , String imageUrl , String backgroundUrl , Integer categoryId);

    Response deleteProduct(Integer productID);

    Response findProductById(Integer productID);
    Response getAllProducts();

    Response searchProduct(String searchValue);

}
