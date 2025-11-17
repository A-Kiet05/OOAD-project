package com.backend.mysticshop.mappers.imple;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.backend.mysticshop.domain.dto.UserDTO;
import com.backend.mysticshop.domain.entities.User;
import com.backend.mysticshop.mappers.Mapper;

@Component
public class UserMapperImple implements Mapper<User, UserDTO> {

    private ModelMapper modelMapper;

    public UserMapperImple(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }
    @Override
    public UserDTO mapTo(User user){
        return modelMapper.map(user , UserDTO.class);
    }

    @Override
    public User mapFrom(UserDTO userDTO){
        return modelMapper.map(userDTO , User.class);
    }
    
}
