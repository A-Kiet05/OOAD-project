package com.backend.mysticshop.domain.entities;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;



import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "product_id")
    private Integer productID; 

    @Column(name = "name" , nullable = false)
    private String name;

    @Column (name="description" , columnDefinition = "TEXT" , nullable = false )
    private String description;

    @Column(name ="price" , columnDefinition = "DECIMAL(10,2)" , nullable = false)
    private BigDecimal price;

    @Column(name = "stock_quantity" , nullable = false )
    private Integer stockQuantity;

    @Column(name = "image_url")
    private String imageUrl;

    @OneToMany(mappedBy = "product" , cascade = CascadeType.ALL)
    private Set<Review> reviews;

    @OneToMany(mappedBy = "product" , cascade = CascadeType.ALL)
    private List<CartItems> cartItems= new ArrayList<>();

    // @ManyToMany(mappedBy = "orderedProductDetails" )
    // private List<Order> orders = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private List<OrderDetails> orderDetails = new ArrayList<>();
}
