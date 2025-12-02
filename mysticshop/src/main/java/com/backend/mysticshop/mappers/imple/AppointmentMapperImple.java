package com.backend.mysticshop.mappers.imple;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.backend.mysticshop.domain.dto.AppointmentDTO;
import com.backend.mysticshop.domain.entities.Appointment;
import com.backend.mysticshop.mappers.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AppointmentMapperImple implements Mapper<Appointment , AppointmentDTO>{
 
    private final ModelMapper modelMapper;

    @Override
    public AppointmentDTO mapTo(Appointment appointment){
        return modelMapper.map(appointment,AppointmentDTO.class);

    }

    @Override
    public Appointment mapFrom(AppointmentDTO appointmentDTO){
        return modelMapper.map(appointmentDTO , Appointment.class);
    }
}
