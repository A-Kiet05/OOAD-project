package com.backend.mysticshop.domain.entities;

import java.util.Date;



import com.backend.mysticshop.domain.enums.ReaderStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "availabilityslots")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AvalabilitySlots {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer slotID; 

    @Column(name = "StartTime")
    private Date startTime;


    @Column(name = "EndTime")
    private Date endTime;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "Status" , columnDefinition = "ENUM('Available' , 'Booked')")
    private ReaderStatus readerStatus;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "UserID", nullable = false , updatable = false)
    private User user;

    @OneToOne(mappedBy = "avalabilitySlots" )
    private Appointment appointment;


}
