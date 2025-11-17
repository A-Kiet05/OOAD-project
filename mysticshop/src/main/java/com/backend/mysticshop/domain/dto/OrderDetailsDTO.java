package com.backend.mysticshop.domain.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsDTO {
    
   
    private Integer orderDetailID;
    private ProductDTO productDTO;
    private UserDTO userDTO;
    private OrderDTO orderDTO;
    private Integer quantity;
    private Double priceAtPurchase;
}
