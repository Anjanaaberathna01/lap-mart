package com.lapmart.lap_mart.repository;

import com.lapmart.lap_mart.model.Monitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonitorRepository extends JpaRepository<Monitor, Long> {
    java.util.List<Monitor> findTop5ByOrderByIdDesc();
}
