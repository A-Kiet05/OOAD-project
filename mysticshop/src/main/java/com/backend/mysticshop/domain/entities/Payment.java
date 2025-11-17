package com.backend.mysticshop.domain.entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import com.backend.mysticshop.domain.enums.PaymentMethod;
import com.backend.mysticshop.domain.enums.PaymentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "payments")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Integer id;
    
    @Column(name= "Amount" , nullable = false )
    private BigDecimal amount; 

    @Column(name = "Method", nullable = false , columnDefinition = "ENUM('CREDIT_CARD', 'PAYPAL', 'CASH_ON_DELIVERY')")
    @Enumerated(EnumType.STRING)
    private PaymentMethod method;
    
    @Column(name = "Status" , nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    @OneToOne
    @JoinColumn(name = "OrderID" , nullable = false)
    private Order order;

    @Column(name= "created_at" , nullable = false , updatable = false)
    @CreationTimestamp
    private LocalDate createdAt;
}
