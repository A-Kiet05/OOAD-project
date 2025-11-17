package com.backend.mysticshop.domain.entities;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import com.backend.mysticshop.domain.enums.AIChatMessageSender;

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

@Entity
@Table(name = "aichatmessages")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AIChatMessage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer aiChatMessageID; 

    @Column( name = "Sender" , columnDefinition = "ENUM('User' , 'AI')")
    private AIChatMessageSender sender ;
    
    @Column(name = "MessageText" , nullable = false , length = 20000)
    private String messageText;

    @CreatedDate
    @Column(name = "Timestamp" , updatable = false , nullable = false)
    private LocalDateTime timeStamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SessionID" , nullable = false)
    private AIChatSession aiChatSession;

}
