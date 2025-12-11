package com.backend.mysticshop.services;



import com.backend.mysticshop.domain.dto.Response;

public interface CartService {
    
    Response addToCart(Integer productId, Integer quantity);
    Response getMyCart();
    Response removeFromCart(Integer cartItemId);
    Response clearCart();
    Response updateCartItemQuantity(Integer cartItemId, Integer quantity);
}