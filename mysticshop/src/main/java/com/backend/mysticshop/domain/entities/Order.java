package com.backend.mysticshop.domain.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime; // Import cho kiểu TIMESTAMP trong SQL
import java.util.ArrayList;
import java.util.List;
// import javax.persistence.*; // Sử dụng JPA Annotations (nếu dùng Spring Data JPA/Hibernate)
import java.util.Set;

import com.backend.mysticshop.domain.enums.OrderStatus;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode

public class Order {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "order_id")
    private Integer orderID; 

   

    @Column(name = "order_date" )
    private final LocalDateTime orderDate = LocalDateTime.now();

   

    @Column(name ="shipping_address" , nullable = false)
    private String shippingAddress;

    @Column(name = "total_amount" , nullable = false)
    private BigDecimal totalAmount; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // @ManyToMany
    // @JoinTable(
    //     name = "order_products_details",
    //     joinColumns = @JoinColumn(name = "OrderID"),
    //     inverseJoinColumns = @JoinColumn(name = "ProductID")
    // )
    // private List<Product> orderedProductDetails = new ArrayList<>();

    @OneToMany(mappedBy = "order" , cascade = CascadeType.ALL)
    private List<OrderDetails> orderDetails = new ArrayList<>();

    @OneToOne(mappedBy = "order" , cascade = CascadeType.ALL)
    private Payment payment;



    

    

  
}
