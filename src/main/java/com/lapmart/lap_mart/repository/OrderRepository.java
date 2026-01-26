package com.lapmart.lap_mart.repository;

import com.lapmart.lap_mart.model.Order;
import com.lapmart.lap_mart.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}