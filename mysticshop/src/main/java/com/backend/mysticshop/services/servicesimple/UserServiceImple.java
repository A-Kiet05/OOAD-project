package com.backend.mysticshop.services.servicesimple;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.mysticshop.domain.dto.LoginRequest;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.dto.UserDTO;
import com.backend.mysticshop.domain.entities.User;
import com.backend.mysticshop.domain.enums.UserRole;
import com.backend.mysticshop.exception.InvalidCredentialsException;
import com.backend.mysticshop.mappers.imple.UserMapperImple;
import com.backend.mysticshop.repositories.UserRepository;
import com.backend.mysticshop.security.JWTUtils;
import com.backend.mysticshop.services.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImple implements UserService {
    
    private final UserRepository userRepository;
    private final JWTUtils jwtUtils;
    private final UserMapperImple userMapperImple;
    private final PasswordEncoder passwordEncoder;

    
    @Override
    public Response registryUser(UserDTO registrationRequest){
        
        UserRole role = UserRole.CUSTOMER;
        
        if(registrationRequest.getRole()!= null && registrationRequest.getRole().equals(UserRole.READER)){
               role = UserRole.READER;
        }

        User user = User.builder()
        .username(registrationRequest.getUsername())
        .email(registrationRequest.getEmail())
        .passwordHash(registrationRequest.getPasswordHash())
        .role(role)
        .build();

        User savedUser = userRepository.save(user);

        UserDTO userDTO = userMapperImple.mapTo(savedUser);

        return Response.builder()
                       .status(200)
                       .message("Registry successfully!!")
                       .user(userDTO)
                       .build();
                        
                        
                     
    }
    
     @Override
    public Response loginUser(LoginRequest loginRequest){
       
        User user = userRepository.findByEmail(loginRequest.getEmail())
        .orElseThrow(() -> new UsernameNotFoundException("Email not found!"));
        if(!passwordEncoder.matches(loginRequest.getPasswordHash(), user.getPasswordHash())){
              throw new InvalidCredentialsException("Password does not match ");
        }

        String token = jwtUtils.generateToken(user);

        return Response.builder()
                       .status(200)
                       .message("User successfully login!")
                       .token(token)
                       .expirationTime("6 months")
                       .role(user.getRole().name())
                       .build();
    }

     @Override
    public Response getAllUser(){
        
        List<User> userList = userRepository.findAll();
        List<UserDTO> userDTOList = userList.stream().map(userMapperImple::mapTo).collect(Collectors.toList());

        return Response.builder()
                       .status(200)
                       .userList(userDTOList)
                       .build();
    }

     @Override
    public User getLogin(){
         
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        log.info("User email is " + email);
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email Not Found!!"));
    }


     @Override
    public Response getUserInfoAndOrderHistory(){
       
        User user = getLogin();
        UserDTO userDTO = userMapperImple.mapTo(user);

        return Response.builder().status(200).user(userDTO).build();
    }
   


   
}
