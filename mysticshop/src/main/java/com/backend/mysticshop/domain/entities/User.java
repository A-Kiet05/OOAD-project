package com.backend.mysticshop.domain.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime; // Import cho kiểu TIMESTAMP trong SQL
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import jakarta.persistence.*;

import com.backend.mysticshop.domain.enums.UserRole;


// import javax.persistence.*; // Sử dụng JPA Annotations (nếu dùng Spring Data JPA/Hibernate)




@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class User {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY  ) 
    private Integer userID; 

    @Column(name ="Username" , unique = true)
    private String username;

    @Column(name = "Email" , unique = true)
    private String email;

    @Column(name="PasswordHash")
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(name = "Role" , columnDefinition = "ENUM('Customer', 'Reader')")
    private UserRole role;

    @Column(name ="CreatedAt")
    private LocalDateTime createdAt;

    @Column(name = "IsEmailVerified" , columnDefinition = "TINYINT(1) DEFAULT 0 ")
    private Boolean isEmailVerified;

    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<OrderDetails> ordersDetails = new ArrayList<>();

    @OneToOne(mappedBy = "reader" , cascade = CascadeType.ALL)
    private ReaderProfiles readerProfiles;

    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<CartItems> cartItems = new ArrayList<>();


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<AIChatSession> aiChatSessions = new ArrayList<>();

    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<AvalabilitySlots> avalabilitySlots = new ArrayList<>();
     
    @OneToMany(mappedBy = "customer" , cascade = CascadeType.ALL)
    private Set<Appointment> appointments;
}
