package com.backend.mysticshop.exception;

public class NotFoundException extends RuntimeException {
    
    public NotFoundException(String message){
        super(message);
    }
}
