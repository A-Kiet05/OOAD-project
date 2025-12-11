package com.backend.mysticshop.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.mysticshop.domain.dto.ReaderProfileDTO;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.services.ReaderService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/readers")
@RequiredArgsConstructor
public class ReaderController {

    private final ReaderService readerService;
    
     @PostMapping("/create-reader-profile")
     @PreAuthorize("hasAuthority('READER')")
     public ResponseEntity<Response> createReaderProfile(@RequestParam (required = false) MultipartFile image,
                                                         @RequestParam (required = false) String bio,
                                                         @RequestParam (required = false) String specialities,
                                                         @RequestParam (required = false) Integer experienceYears
     ){
        return ResponseEntity.ok(readerService.createReaderProfile(image, experienceYears , specialities , bio ));
     }

     
     @GetMapping("/get-reader-profile-by-id/{readerId}")
     public ResponseEntity<Response> getReaderProfileById(@PathVariable Integer readerId){
        return ResponseEntity.ok(readerService.getReaderProfileByUserId(readerId));
     }

     @PutMapping("/update-reader-profile/{readerId}")
     @PreAuthorize("hasAuthority('READER')")
     public ResponseEntity<Response> updateReaderProfile(
        @PathVariable Integer readerId ,
        @RequestParam (required = false) MultipartFile image,
        @RequestParam (required = false) String bio,
        @RequestParam (required = false) String specialities,
        @RequestParam (required = false) Integer experienceYears
     ){
        return ResponseEntity.ok(readerService.updateReaderProfile(readerId, image , experienceYears , specialities , bio));
     }


     @GetMapping("/get-all-profiles")
     public ResponseEntity<Response> getAllReaderProfiles(){
        return ResponseEntity.ok(readerService.getAllReaders());
     }

     @DeleteMapping("/delete-profile/{readerProfileId}")
     @PreAuthorize("hasAuthority('READER')")
     public ResponseEntity<Response> deleteProfile(@PathVariable Integer readerProfileId){
        return ResponseEntity.ok(readerService.deleteReaderProfile(readerProfileId));
     }


}
