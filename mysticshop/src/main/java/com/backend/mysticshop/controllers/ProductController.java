package com.backend.mysticshop.controllers;

import java.math.BigDecimal;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.services.ProductService;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor

public class ProductController {
     
    private final ProductService productService;
    
    @PostMapping("/create-product")
    @PreAuthorize("hasAuthority('READER')")
    public ResponseEntity<Response> createProduct(
                                                  @RequestParam (required = false) String description,
                                                  @RequestParam (required = true) String name,
                                                  @RequestParam (required = true) BigDecimal price,
                                                  @RequestParam (required = true) Integer stockQuantity,
                                                  @RequestParam (required = false) String imageUrl,
                                                  @RequestParam (required = false) String backgroundUrl,
                                                  @RequestParam (required = true) Integer categoryId
                                                 ){
                    return ResponseEntity.ok(productService.createProduct( name, description, price, stockQuantity , imageUrl, backgroundUrl , categoryId));
    }

    @PutMapping("/update-product/{productId}")
    @PreAuthorize("hasAuthority('READER')")
    public ResponseEntity<Response> updateProduct(
        @PathVariable Integer productId, 
        @RequestParam (required = false) String description,
        @RequestParam (required = false) String name,
        @RequestParam (required = false) BigDecimal price ,
        @RequestParam (required = false) Integer stockQuantity,
        @RequestParam (required = false) String imageUrl,
        @RequestParam (required = false) String backgroundUrl,
        @RequestParam (required = false) Integer categoryId
    ){
        return ResponseEntity.ok(productService.updateProduct(productId, name, description, price , stockQuantity , imageUrl ,backgroundUrl, categoryId));
    }



    @DeleteMapping("/delete-product/{productId}")
    @PreAuthorize("hasAuthority('READER')")
    public ResponseEntity<Response> deleteProduct(@PathVariable Integer productId){
         return ResponseEntity.ok(productService.deleteProduct(productId));
    }

    @GetMapping("/get-product/{productId}")
    public ResponseEntity<Response> getProductById(@PathVariable Integer productId){
        return ResponseEntity.ok(productService.findProductById(productId));
    }

    @GetMapping("/get-all-product")
    public ResponseEntity<Response> getAllProduct(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/search-product")
    public ResponseEntity<Response> searchProduct(@RequestParam String searchValue){
            return ResponseEntity.ok(productService.searchProduct(searchValue));
    }


}
