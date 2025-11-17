package com.backend.mysticshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.mysticshop.domain.entities.AvalabilitySlots;

@Repository
public interface AvailableSlotRepository extends JpaRepository<AvalabilitySlots, Integer>{

}