package com.backend.mysticshop.repositories;



import com.backend.mysticshop.domain.entities.CartItems;
import com.backend.mysticshop.domain.entities.Product;
import com.backend.mysticshop.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItems, Integer> {
    
    List<CartItems> findByUser(User user);
    
   
    Optional<CartItems> findByUserAndProduct(User user, Product product);
    
    
    void deleteByUser(User user);
}