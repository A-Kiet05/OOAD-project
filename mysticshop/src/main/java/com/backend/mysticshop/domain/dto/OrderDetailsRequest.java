package com.backend.mysticshop.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderDetailsRequest {
    
    private ProductDTO productID;
    private Integer quantity;
}
