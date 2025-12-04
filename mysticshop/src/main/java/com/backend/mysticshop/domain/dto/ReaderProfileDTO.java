package com.backend.mysticshop.domain.dto;

import org.springframework.web.multipart.MultipartFile;

import com.backend.mysticshop.domain.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class ReaderProfileDTO {
    
     
    private Integer readerProfileID; 
    private String bio;
    private Integer experienceYears;
    private String specialties;
    private User reader;
    private String avatarUrl;   
    

}
