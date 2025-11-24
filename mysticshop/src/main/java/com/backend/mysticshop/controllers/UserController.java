package com.backend.mysticshop.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.dto.UserDTO;
import com.backend.mysticshop.mappers.Mapper;
import com.backend.mysticshop.services.UserService;

import lombok.RequiredArgsConstructor;

import com.backend.mysticshop.domain.entities.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    
    private final UserService userService;
    

    

    @GetMapping("/Get-all")
    @PreAuthorize("hasAuthority('READER')")
    public ResponseEntity<Response> getAllUserInfo(){
        return ResponseEntity.ok(userService.getAllUser());
    }

    @GetMapping("/Get-user-info")
    public ResponseEntity<Response> getUserInfo(){
        return ResponseEntity.ok(userService.getUserInfoAndOrderHistory());
    }
}
