package com.backend.mysticshop.mappers.imple;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.backend.mysticshop.domain.dto.AvailableSlotDTO;
import com.backend.mysticshop.domain.entities.AvalabilitySlots;
import com.backend.mysticshop.mappers.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class SlotsMapperImple implements Mapper<AvalabilitySlots , AvailableSlotDTO>{

    private final ModelMapper modelMapper;

    @Override
    public AvailableSlotDTO mapTo(AvalabilitySlots availabilitySlots){
        return modelMapper.map(availabilitySlots, AvailableSlotDTO.class);


    }

    @Override
    public AvalabilitySlots mapFrom(AvailableSlotDTO availableSlotDTO){
        return modelMapper.map(availableSlotDTO , AvalabilitySlots.class);
    }
}
