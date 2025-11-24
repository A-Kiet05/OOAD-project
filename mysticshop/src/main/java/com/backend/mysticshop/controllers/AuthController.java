package com.backend.mysticshop.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.mysticshop.domain.dto.LoginRequest;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.dto.UserDTO;
import com.backend.mysticshop.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor

public class AuthController{


     private final UserService userService;
     
     @PostMapping("/register")
     public ResponseEntity<Response> registryUser(@RequestBody UserDTO userDTO){
            return ResponseEntity.ok(userService.registryUser(userDTO));
     }

     @GetMapping("/login")
     public ResponseEntity<Response> getLoginUser(@RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(userService.loginUser(loginRequest));
     }
} 