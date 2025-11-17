package com.backend.mysticshop.domain.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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


public class Order {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer orderID; 

   

    @Column(name = "OrderDate")
    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status" , columnDefinition = "ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled')")
    private OrderStatus status;

    @Column(name ="ShippingAddress")
    private String shippingAddress;

    @ManyToMany
    @JoinTable(
        name = "order_products_details",
        joinColumns = @JoinColumn(name = "OrderID"),
        inverseJoinColumns = @JoinColumn(name = "ProductID")
    )
    private List<Product> orderedProductDetails = new ArrayList<>();

    @OneToMany(mappedBy = "order" , cascade = CascadeType.ALL)
    private List<OrderDetails> orderDetails = new ArrayList<>();

    @OneToOne(mappedBy = "order" , cascade = CascadeType.ALL)
    private Payment payment;



    

    

  
}
