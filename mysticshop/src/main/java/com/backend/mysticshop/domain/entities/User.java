package com.backend.mysticshop.domain.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime; // Import cho kiểu TIMESTAMP trong SQL

import java.util.List;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

import com.backend.mysticshop.domain.enums.UserRole;


// import javax.persistence.*; // Sử dụng JPA Annotations (nếu dùng Spring Data JPA/Hibernate)




@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode


public class User {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY  ) 
    @Column(name = "user_id")
    private Integer userID; 

    @Column(name ="username" , unique = true , nullable = false)
    private String username;

    @Column(name = "email" , unique = true , nullable = false)
    private String email;

    @Column(name="password_hash" , nullable = false)
    private String passwordHash;

    @Column(name = "full_name" , nullable = false)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(name = "role" , columnDefinition = "ENUM('Customer', 'Reader')")
    private UserRole role;

    @Column(name ="created_at")
    private final LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "is_email_verified" , columnDefinition = "TINYINT(1) DEFAULT 0 ")
    private Boolean isEmailVerified;

    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<OrderDetails> ordersDetails ;

    @OneToOne(mappedBy = "reader" , cascade = CascadeType.ALL)
    private ReaderProfiles readerProfiles;

    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<Review> reviews ;

    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<CartItems> cartItems ;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<AIChatSession> aiChatSessions;

    @OneToMany(mappedBy = "reader" , cascade = CascadeType.ALL)
    private List<AvalabilitySlots> avalabilitySlots ;
     
    @OneToMany(mappedBy = "customer" , cascade = CascadeType.ALL)
    private List<Appointment> appointments;
}
