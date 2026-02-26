package com.lapmart.lap_mart.repository;

import com.lapmart.lap_mart.model.Keyboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeyboardRepository extends JpaRepository<Keyboard, Long> {
    List<Keyboard> findTop5ByOrderByIdDesc();
}
