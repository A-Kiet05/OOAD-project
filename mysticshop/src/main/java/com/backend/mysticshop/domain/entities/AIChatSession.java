// package com.backend.mysticshop.domain.entities;


// import java.time.LocalDateTime;

// import java.util.Set;

// import org.springframework.data.annotation.CreatedDate;

// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.OneToMany;
// import jakarta.persistence.Table;
// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.EqualsAndHashCode;
// import lombok.NoArgsConstructor;

// @Entity
// @Table(name = "ai_chat_sessions")
// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// @Builder
// @EqualsAndHashCode
// public class AIChatSession {
    
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY) 
//     @Column(name = "session_id")
//     private Integer aiChatSessionID; 
    

//     @CreatedDate
//     @Column(name = "start_time" , updatable = false , nullable = false)
//     private LocalDateTime startTime;
    
//     @CreatedDate
//     @Column(name = "end_time" , updatable = false , nullable = false)
//     private LocalDateTime endTime;

//     @ManyToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name ="user_id" , nullable = false)
//     private User user;

//     @OneToMany(mappedBy = "aiChatSession" , cascade = CascadeType.ALL)
//     private Set<AIChatMessage> aiChatMessages ;
// }
