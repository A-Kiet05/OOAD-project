package com.backend.mysticshop.services.servicesimple;



import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.mysticshop.domain.dto.CartItemsDTO;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.entities.CartItems;
import com.backend.mysticshop.domain.entities.Product;
import com.backend.mysticshop.domain.entities.User;
import com.backend.mysticshop.exception.NotFoundException;
import com.backend.mysticshop.mappers.Mapper;

import com.backend.mysticshop.repositories.CartRepository;
import com.backend.mysticshop.repositories.ProductRepository;
import com.backend.mysticshop.services.CartService;
import com.backend.mysticshop.services.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CartServiceImple implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserService userService;
    private final Mapper<CartItems, CartItemsDTO> cartMapper;

    @Override
    public Response addToCart(Integer productId, Integer quantity) {
       
        User user = userService.getLogin();

        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product Not Found!"));

        // check if it satisfy the quantity of user or not 
        if (product.getStockQuantity() < quantity) {
            throw new IllegalArgumentException("Insufficient stock quantity!");
        }

       
        Optional<CartItems> existingCartItem = cartRepository.findByUserAndProduct(user, product);

        if (existingCartItem.isPresent()) {
            //if have update the quantity
            CartItems existingItem = existingCartItem.get();
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            cartRepository.save(existingItem);
        } else {
            //if not create
            CartItems newItem = new CartItems();
            newItem.setUser(user);
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            cartRepository.save(newItem);
        }

         return Response.builder()
                        .status(200)
                        .message("Added to cart successfully!")
                        .build();
    }

   @Override
   public Response getMyCart() {

        User user = userService.getLogin();
        List<CartItems> cartItems = cartRepository.findByUser(user);

             //iterate through each item and validate the stock
        List<CartItems> validatedCartItems = cartItems.stream()
                                                      .map(this::validateAndSyncItemStock) // Gọi hàm helper cho từng item
                                                      .filter(Objects::nonNull) // Lọc bỏ item null (nếu logic của bạn có xóa item hết hàng)
                                                      .collect(Collectors.toList());

                // Map sang DTO
                List<CartItemsDTO> cartItemsDTOs = validatedCartItems.stream()
                        .map(cartMapper::mapTo)
                        .collect(Collectors.toList());

                 return Response.builder()
                                .status(200)
                                .message("Successfully retrieved cart!")
                                .cartItemsDTOList(cartItemsDTOs)
                                .build();
   }
    @Override
    public Response removeFromCart(Integer cartItemId) {
        
        CartItems cartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new NotFoundException("Cart Item not found!"));

        
        User currentUser = userService.getLogin();
        if (!cartItem.getUser().getUserID().equals(currentUser.getUserID())) {
            throw new IllegalArgumentException("You are not authorized to remove this item.");
        }

        
        cartRepository.delete(cartItem);

         return Response.builder()
                        .status(200)
                        .message("Item removed from cart!")
                        .build();
    }

    @Override
    public Response clearCart() {

        User user = userService.getLogin();
        List<CartItems> cartItems = cartRepository.findByUser(user);
       
        if(cartItems.isEmpty()){
            throw new NotFoundException("user's cart items not exist!");
        }
        
        cartRepository.deleteAll(cartItems);

         return Response.builder()
                        .status(200)
                        .message("Cart cleared!")
                        .build();
    }
    
    @Override
    public Response updateCartItemQuantity(Integer cartItemId, Integer quantity) {

        CartItems cartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new NotFoundException("Cart Item not found!"));

        // quantity <= 0
        if (quantity <= 0) {
            cartRepository.delete(cartItem);
            return Response.builder()
                    .status(200)
                    .message("Item removed")
                    .build();
        }

        
        cartItem.setQuantity(quantity);

        //check product Quantity
        CartItems validatedItem = validateAndSyncItemStock(cartItem);

        String message = "Quantity updated";
        
        //if validatedItem's quantity not equals with the
        if (!validatedItem.getQuantity().equals(quantity)) {
            message = "Quantity adjusted to maximum available stock: " + validatedItem.getQuantity();
        }

         return Response.builder()
                        .status(200)
                        .message(message)
                        .build();
    }

    //helper method
    private CartItems validateAndSyncItemStock(CartItems item) {
        Product product = item.getProduct();
        Integer currentStock = product.getStockQuantity();

        // if product's quantity less than user's desired quantity 
        if (item.getQuantity() > currentStock) {
            if (currentStock == 0) {
                
                item.setQuantity(0);
                return null;
            } else {
                
                item.setQuantity(currentStock);
            }
            
            return cartRepository.save(item);
        }
        
        
        return cartRepository.save(item);
    }

}