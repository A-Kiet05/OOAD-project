package com.backend.mysticshop.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.services.CartService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartItemsController {
    
    private final CartService cartService;

    @PostMapping("/add-to-cart/{productId}")
    public ResponseEntity<Response> addToCart(
           @PathVariable Integer productId , 
           @RequestParam (required = true) Integer quantity
        ){

            return ResponseEntity.ok(cartService.addToCart(productId, quantity));
        }
    
    @GetMapping("/get-own-cart")
    public ResponseEntity<Response> getOwnCart(){
        return ResponseEntity.ok(cartService.getMyCart());
    }

    @DeleteMapping("/remove-cart/{cartId}")
    public ResponseEntity<Response> delete(@PathVariable Integer cartId){

        return ResponseEntity.ok(cartService.removeFromCart(cartId));
    }

    @DeleteMapping("/clear-all")
    public ResponseEntity<Response> clearAll(){

        return ResponseEntity.ok(cartService.clearCart());
    }

    @PutMapping("/update-quantity/{cartId}")
    @PreAuthorize("hasAuthority('READER')")
    public ResponseEntity<Response> update(
        @PathVariable Integer cartId ,
        @RequestParam (required = true) Integer quantity
    ){

        return ResponseEntity.ok(cartService.updateCartItemQuantity(cartId , quantity));
    }

}
