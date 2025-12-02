package com.backend.mysticshop.domain.entities;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

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
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "availability_slots")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class AvalabilitySlots {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "slot_id")
    private Integer slotID; 

    
    @Enumerated(EnumType.STRING)
    @Column(name = "status" , columnDefinition = "ENUM('Available' , 'Booked')")
    private ReaderStatus readerStatus;
    
    @Column(name = "start_time" , nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time" , nullable = false)
    private LocalTime endTime;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reader_id", nullable = false , updatable = false)
    private User reader;

    @OneToMany(mappedBy = "avalabilitySlots" )
    private List<Appointment> appointments;


}
