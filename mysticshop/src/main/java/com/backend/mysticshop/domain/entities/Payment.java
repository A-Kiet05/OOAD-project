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
import lombok.Cleanup;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "payments")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    @Column(name = "payment_id")
    private Integer paymentID;
    
    @Column(name= "amount" , nullable = false )
    private BigDecimal amount; 

    @Column(name = "method", nullable = false , columnDefinition = "ENUM('CREDIT_CARD', 'PAYPAL', 'CASH_ON_DELIVERY')")
    @Enumerated(EnumType.STRING)
    private PaymentMethod method;
    
    @Column(name = "status" , nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    @OneToOne
    @JoinColumn(name = "order_id" , unique = true, nullable = false)
    private Order order;

    @Column(name= "created_at")
    @CreationTimestamp
    private LocalDate createdAt;
}
