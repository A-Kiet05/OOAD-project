package com.backend.mysticshop.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;


import com.backend.mysticshop.domain.entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>{

    

    
}
