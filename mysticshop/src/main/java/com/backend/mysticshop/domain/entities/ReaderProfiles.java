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
import lombok.NoArgsConstructor;

@Table(name = "readerprofiles")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReaderProfiles {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer readerProfileID; 

    @Column(name="Bio")
    private String bio;

    @Column(name= " ExperienceYears"  )
    private Integer experienceYears;

    @Column(name ="Specialties" )
    private String specialties;

    @Column(name= "AvatarUrl")
    private String avatarUrl;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="UserID" , unique =  true)
    private User reader;






}
