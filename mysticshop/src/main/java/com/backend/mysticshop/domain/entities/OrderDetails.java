package com.backend.mysticshop.domain.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orderitems")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter

public class OrderDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Integer orderDetailID;
    
    @ManyToOne
    // @MapsId("orderID")
    @JoinColumn(name ="OrderID" , nullable = false)
    private Order order;

    
    @ManyToOne (fetch = FetchType.LAZY)
    // @MapsId("productID")
    @JoinColumn(name = "ProductID" , nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name =" UserID ")
    private User user;

    @Column(name = "Quantity" , nullable = false)
    private Integer quantity;

    @Column(name = "PriceAtPurchase" , nullable = false , columnDefinition = "DECIMAL(10,2) , Price At The Time Of Purchase")
    private Double priceAtPurchase;




}
