package com.backend.mysticshop.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.format.annotation.DateTimeFormat;
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

import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.dto.SlotRequest;
import com.backend.mysticshop.services.SlotService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/slots")
@RequiredArgsConstructor
public class SlotController {
     
    private final SlotService slotService;
    
    @PostMapping("/create-slot")
    @PreAuthorize(" hasAuthority('READER')")
    public ResponseEntity<Response> createSlot(@RequestBody SlotRequest slotRequest){
        return ResponseEntity.ok(slotService.createSlot(slotRequest));
    }
    
    @GetMapping("/all")
    public ResponseEntity<Response> getAllSlots(){
        return ResponseEntity.ok(slotService.getAllSlots());
    }
    
    @GetMapping("/get-by-status")
    public ResponseEntity<Response> findSlotsByStatus(@RequestParam (required = true) String status){
        return ResponseEntity.ok(slotService.findSlotsByStatus(status));
    }

    @PutMapping("/update-slot/{slotID}")
    @PreAuthorize(" hasAuthority('READER')")
    public ResponseEntity<Response> updateSlots(
    @PathVariable Integer slotID, 
    @RequestParam (required = false) String status ,
    @RequestParam (required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime startTime,
    @RequestParam (required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime endTime,
    @RequestParam (required =  false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date

   ){
         return ResponseEntity.ok(slotService.updateSlot(slotID,date ,  startTime, endTime, status));
   } 

    @GetMapping("/get-by-readerId-and-status")
    
    public ResponseEntity<Response> findSlotByReaderIdAndStatus(
        @RequestParam (required = true) String status ,
        @RequestParam(required = true) Integer readerID
        
    ){
        return ResponseEntity.ok(slotService.findSlotByReaderIdAndStatus(readerID , status));
    }

    @GetMapping("/get-slot-by-reader")
    @PreAuthorize(" hasAuthority('READER')")
    public ResponseEntity<Response> findSlotByReaderAndStatus(@RequestParam (required = true) String status ){
        return ResponseEntity.ok(slotService.findSlotByReaderAndStatus(status));
    }
    
    @GetMapping("/get-avaiSlot-by-time-and-readerId")
    public ResponseEntity<Response> findAvailableSlotByTimeAndReaderId(

       @RequestParam (required = true) Integer readerID, 
       @RequestParam (required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
       @RequestParam (required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime startTime,
       @RequestParam (required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime endTime

    ){
         return ResponseEntity.ok(slotService.findAvailableSlotByTimeAndReaderId(readerID , date , startTime , endTime));
    }

    @GetMapping("/get-by-id/{slotID}")
    public ResponseEntity<Response> findSlotById(@PathVariable Integer slotID){

        return ResponseEntity.ok(slotService.findSlotById(slotID));
    }

    @DeleteMapping("/delete-slot/{slotID}")
    @PreAuthorize(" hasAuthority('READER')")
    public ResponseEntity<Response> deleteSlot(@PathVariable Integer slotID){
        return ResponseEntity.ok(slotService.deleteSlot(slotID));
    }
}
