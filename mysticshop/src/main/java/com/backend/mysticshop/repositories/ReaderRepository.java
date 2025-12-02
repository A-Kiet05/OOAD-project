package com.backend.mysticshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.mysticshop.domain.entities.ReaderProfiles;

@Repository
public interface ReaderRepository extends JpaRepository<ReaderProfiles , Integer >{
      
}
