package com.backend.mysticshop.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.mysticshop.domain.entities.Product;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    
    List<Product> findByNameContainingOrDescriptionContaining(String name , String description);
}
