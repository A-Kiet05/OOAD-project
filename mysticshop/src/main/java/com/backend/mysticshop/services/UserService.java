package com.backend.mysticshop.services;

import java.util.List;

import com.backend.mysticshop.domain.dto.LoginRequest;
import com.backend.mysticshop.domain.dto.ResgisterRequest;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.dto.UserDTO;
import com.backend.mysticshop.domain.entities.User;

public interface UserService {

    Response registryUser(ResgisterRequest resgisterRequest);
    Response loginUser(LoginRequest loginRequest);

    Response getAllUser();
    User getLogin();
    Response getUserInfoAndOrderHistory();



    
    
     

    
}
