package com.backend.mysticshop.domain.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.Collate;

import com.backend.mysticshop.domain.enums.AppointmentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
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
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "appointments")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class Appointment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "appointment_id")
    private Integer appointmentID; 

    @Column(name = "booking_date"  , nullable = false)
    private LocalDateTime bookingDate;


    @Enumerated(EnumType.STRING)
    @Column(name = "status" , nullable = false, columnDefinition = "ENUM('Confirmed' , 'Cancelled' , 'Completed')")
    private AppointmentStatus appointmentStatus;

    @Column(name = "notes" , length = 2000 )
    private String notes;

    @OneToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "slot_id" , unique = true , nullable = false)
    private AvalabilitySlots avalabilitySlots;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id" , nullable = false)
    private User customer;
}
