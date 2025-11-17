package com.backend.mysticshop.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.mysticshop.domain.dto.UserDTO;
import com.backend.mysticshop.mappers.Mapper;
import com.backend.mysticshop.services.UserService;

import lombok.RequiredArgsConstructor;

import com.backend.mysticshop.domain.entities.*;

@RestController
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    private final Mapper<User, UserDTO> userMapper;

    

    @PostMapping(path ="/users")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO){
        return null;
    }
}
