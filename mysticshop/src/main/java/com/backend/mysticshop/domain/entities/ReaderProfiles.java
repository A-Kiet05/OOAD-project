package com.backend.mysticshop.domain.entities;



import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Table(name = "reader_profiles")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class ReaderProfiles {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "profile_id")
    private Integer readerProfileID; 

    @Column(name="bio" , nullable = false)
    private String bio;

    @Column(name= " experience_years" , nullable = false  )
    private Integer experienceYears;

    @Column(name ="specialties" , nullable = false)
    private String specialties;

    @Column(name= "avatar_url" , nullable = false)
    private String avatarUrl;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="reader_id" , unique =  true)
    private User reader;






}
