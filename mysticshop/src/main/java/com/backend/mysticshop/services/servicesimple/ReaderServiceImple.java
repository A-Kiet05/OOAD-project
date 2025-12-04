package com.backend.mysticshop.services.servicesimple;

import java.io.Reader;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.mysticshop.domain.dto.CloudinaryResponse;
import com.backend.mysticshop.domain.dto.ReaderProfileDTO;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.dto.SlotRequest;
import com.backend.mysticshop.domain.entities.ReaderProfiles;
import com.backend.mysticshop.domain.entities.User;
import com.backend.mysticshop.exception.NotFoundException;
import com.backend.mysticshop.mappers.Mapper;
import com.backend.mysticshop.repositories.ReaderRepository;
import com.backend.mysticshop.repositories.UserRepository;
import com.backend.mysticshop.services.CloudinaryService;
import com.backend.mysticshop.services.ReaderService;
import com.backend.mysticshop.services.UserService;
import com.cloudinary.Cloudinary;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReaderServiceImple implements ReaderService {

    private final ReaderRepository readerRepository;
    private final UserService userService;
    private final Mapper<ReaderProfiles,ReaderProfileDTO> readerMapper;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;
    
    @Override
    public Response getReaderProfileByUserId(Integer userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found!"));
        ReaderProfiles readerProfiles = readerRepository.findById(user.getReaderProfiles().getReaderProfileID()).orElseThrow(() -> new NotFoundException("Reader not found !"));
        ReaderProfileDTO readerProfileDTO = readerMapper.mapTo(readerProfiles);

        return Response.builder()
                       .status(200)
                       .message("Success")
                       .build();
    }

     @Override
    public Response updateReaderProfile(Integer userId , MultipartFile file , int experienceYears , String specialties, String bio){
              
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found!"));
        ReaderProfiles readerProfiles = readerRepository.findById(user.getReaderProfiles().getReaderProfileID()).orElseThrow(() -> new NotFoundException("Reader not found !"));

        if (file != null && !file.isEmpty()) {

        CloudinaryResponse cloudinaryResponse = cloudinaryService.uploadFile(
                file,
                "reader_" + userId,
                "readers"
        );

        readerProfiles.setAvatarUrl(cloudinaryResponse.getUrl());
      }

    
              if (bio != null) readerProfiles.setBio(bio);
              if (experienceYears >=0) readerProfiles.setExperienceYears(experienceYears);
              if (specialties != null) readerProfiles.setSpecialties(specialties);

        readerRepository.save(readerProfiles);
        return Response.builder()       
                       .status(200)
                       .message("Updated reader profiles successfully !")
                       .build();
    }

     @Override
    public Response createReaderProfile(MultipartFile file , int experienceYears , String specialties, String bio){
         
        User user = userService.getLogin();
        if(user == null || !user.getRole().toString().equals("READER")){
            throw new IllegalArgumentException("Only reader can create reader profile !");
        }

        ReaderProfiles readerProfiles = new ReaderProfiles();
        if (file != null && !file.isEmpty()) {
        CloudinaryResponse cloudinaryResponse = cloudinaryService.uploadFile(
                file,
                "reader_" + user.getUserID(),
                "readers"
        );
        readerProfiles.setAvatarUrl(cloudinaryResponse.getUrl());
       } else {
        readerProfiles.setAvatarUrl(null);
       }
        readerProfiles.setBio(bio);
        readerProfiles.setExperienceYears(experienceYears);
        readerProfiles.setSpecialties(specialties);
        readerProfiles.setReader(user);

        readerRepository.save(readerProfiles);

        return Response.builder()       
                       .status(200)
                       .message("Created reader profiles successfully !")
                       .build();
    }

     @Override
    public Response getAllReaders(){
        List<ReaderProfileDTO> readerProfileDTOs = readerRepository.findAll().stream().map(readerMapper::mapTo).collect(Collectors.toList());

        return Response.builder()       
                       .status(200)
                       
                       .build();
    }

     @Override
    public Response deleteReaderProfile(Integer readerProfileId){
        readerRepository.findById(readerProfileId).orElseThrow(() -> new NotFoundException("Reader Profile Id Desired not found!"));
        readerRepository.deleteById(readerProfileId);

        return Response.builder()       
                       .status(200)
                       .message("Deleted reader profiles successfully !")
                       .build();

    }
}
