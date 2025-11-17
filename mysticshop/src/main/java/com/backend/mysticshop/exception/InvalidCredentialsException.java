package com.backend.mysticshop.exception;

public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException(String message){
         super(message);
    }
}
