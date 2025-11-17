package com.backend.mysticshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.backend.mysticshop.domain.entities.OrderDetails;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetails , Integer> , JpaSpecificationExecutor<OrderDetails> 
{
    
}
