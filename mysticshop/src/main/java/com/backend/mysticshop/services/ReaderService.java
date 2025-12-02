package com.backend.mysticshop.services;

import com.backend.mysticshop.domain.dto.ReaderProfileDTO;
import com.backend.mysticshop.domain.dto.Response;

public interface ReaderService {
    
    Response getReaderProfileByUserId(Integer userId);
    Response updateReaderProfile(Integer userId , ReaderProfileDTO readerProfileDTO);
    Response createReaderProfile(Integer userId , ReaderProfileDTO readerProfileDTO);
    Response getAllReaders();
    Response deleteReaderProfile(Integer readerId);
    
}
