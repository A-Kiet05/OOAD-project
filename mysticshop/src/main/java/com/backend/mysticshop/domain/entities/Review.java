package com.backend.mysticshop.domain.entities;

import java.time.LocalDateTime;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
import lombok.NoArgsConstructor;

@Table(name = "reviews")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer reviewID; 

    @Column(name = "Rating")
    private Integer rating;

    @Column(name = "Comment" , columnDefinition = "TEXT" , length  = 2000)
    private String comment;

    @Column(name="ReviewDate")
    private LocalDateTime reviewDate;

    @ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name ="UserID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProductID")
    private Product product;

}
