package com.backend.mysticshop.domain.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;

import com.backend.mysticshop.domain.entities.CartItems;
import com.backend.mysticshop.domain.entities.OrderDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    
   
    private Integer productID; 
    private String name;
    private String description;
    private Double price;
    private Integer stockQuantity;
    private String imageUrl;
    private String backgroundUrl;
    private CategoryDTO category;
    // private List<CartItemsDTO> cartItems = new ArrayList<>();
    // private List<OrderDetailsDTO> orderDetails = new ArrayList<>();
}
