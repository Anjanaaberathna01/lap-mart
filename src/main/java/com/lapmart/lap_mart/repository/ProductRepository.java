package com.lapmart.lap_mart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.lapmart.lap_mart.model.Laptop;

@Repository
public interface ProductRepository extends JpaRepository<Laptop, Long> {

}
