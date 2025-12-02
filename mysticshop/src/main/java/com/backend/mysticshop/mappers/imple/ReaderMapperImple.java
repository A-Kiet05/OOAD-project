package com.backend.mysticshop.mappers.imple;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.backend.mysticshop.domain.dto.ReaderProfileDTO;
import com.backend.mysticshop.domain.entities.ReaderProfiles;
import com.backend.mysticshop.mappers.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class ReaderMapperImple implements Mapper<ReaderProfiles , ReaderProfileDTO> {
   
    private final ModelMapper modelMapper;

    @Override
    public ReaderProfileDTO mapTo(ReaderProfiles readerProfiles){
        return modelMapper.map(readerProfiles, ReaderProfileDTO.class);
    }

    @Override
    public ReaderProfiles mapFrom(ReaderProfileDTO readerProfileDTO){
        return modelMapper.map(readerProfileDTO, ReaderProfiles.class);
    }

    
}
