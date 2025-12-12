package com.backend.mysticshop.domain.dto;

import com.backend.mysticshop.domain.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class ResgisterRequest {

    
    private String username;
    
    @NotBlank
    private String email;

    @NotBlank
    private String passwordHash;

    @NotBlank
    private String fullName;
    
    private UserRole role;
}
