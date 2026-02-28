package com.lapmart.lap_mart.repository;

import com.lapmart.lap_mart.model.Laptop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LaptopRepository extends JpaRepository<Laptop, Long> {
    List<Laptop> findTop5ByOrderByIdDesc();
}
