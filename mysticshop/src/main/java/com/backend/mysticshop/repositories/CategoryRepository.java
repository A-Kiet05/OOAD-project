package com.backend.mysticshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.mysticshop.domain.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category , Integer> {
    
}
