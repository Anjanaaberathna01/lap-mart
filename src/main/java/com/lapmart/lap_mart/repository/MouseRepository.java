package com.lapmart.lap_mart.repository;

import com.lapmart.lap_mart.model.Mouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MouseRepository extends JpaRepository<Mouse, Long> {
    List<Mouse> findTop5ByOrderByIdDesc();
}
