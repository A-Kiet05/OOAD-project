package com.backend.mysticshop.domain.entities;


import java.math.BigDecimal;

import com.backend.mysticshop.domain.enums.OrderStatus;


import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "order_details")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode

public class OrderDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    @Column(name = "order_detail_id")
    private Integer orderDetailID;
    
    @ManyToOne
    // @MapsId("orderID")
    @JoinColumn(name ="order_id" , nullable = false)
    private Order order;

    
    @ManyToOne (fetch = FetchType.LAZY)
    // @MapsId("productID")
    @JoinColumn(name = "product_id" , nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name =" user_id " , nullable = false)
    private User user;

    @Column(name = "quantity" , nullable = false)
    private Integer quantity;

    @Column(name = "price_at_purchase" , nullable = false , columnDefinition = "DECIMAL(10,2) , Price At The Time Of Purchase")
    private BigDecimal priceAtPurchase;

    @Enumerated(EnumType.STRING)
    @Column(name = "status" , columnDefinition = "ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled')" , nullable = false)
    private OrderStatus status;




}
