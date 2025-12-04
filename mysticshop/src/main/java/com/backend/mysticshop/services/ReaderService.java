package com.backend.mysticshop.services;

import org.springframework.web.multipart.MultipartFile;

import com.backend.mysticshop.domain.dto.ReaderProfileDTO;
import com.backend.mysticshop.domain.dto.Response;

public interface ReaderService {
    
    Response getReaderProfileByUserId(Integer userId);
    Response updateReaderProfile(Integer userId , MultipartFile file , int experienceYears , String specialties, String bio);
    Response createReaderProfile(MultipartFile file , int experienceYears , String specialties, String bio);
    Response getAllReaders();
    Response deleteReaderProfile(Integer readerId);
    
}
