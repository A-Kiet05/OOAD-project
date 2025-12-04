package com.backend.mysticshop.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.mysticshop.domain.dto.CloudinaryResponse;
import com.cloudinary.Cloudinary;

import jakarta.transaction.Transactional;

@Service
public class CloudinaryService {
    @Autowired
    private Cloudinary cloudinary;

    @Transactional
    public CloudinaryResponse uploadFile(
        MultipartFile file,
        String fileName,
        String folder
) {
    try {
        Map<String, Object> uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                Map.of(
                        "folder", folder,
                        "public_id", fileName
                )
        );

        return CloudinaryResponse.builder()
                .publicId((String) uploadResult.get("public_id"))
                .url((String) uploadResult.get("secure_url"))
                .build();

    } catch (Exception e) {
        throw new RuntimeException("Cloudinary upload failed: " + e.getMessage());
    }
}
}
