package com.backend.mysticshop.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.mysticshop.domain.entities.User;
import com.backend.mysticshop.exception.NotFoundException;
import com.backend.mysticshop.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    

    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        
        User user = userRepository.findByEmail(username).
        orElseThrow(() -> new NotFoundException("Username/Email Not Found"));

        return AuthUser.builder()
        .user(user)
        .build();

    }

}
