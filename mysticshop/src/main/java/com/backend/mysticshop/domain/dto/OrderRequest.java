package com.backend.mysticshop.domain.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.backend.mysticshop.domain.entities.Payment;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderRequest {
     
    private BigDecimal totalAmount;
    private List<OrderDetailsRequest> orderDetailsRequests = new ArrayList<>();
    private Payment paymentInfo;
}
