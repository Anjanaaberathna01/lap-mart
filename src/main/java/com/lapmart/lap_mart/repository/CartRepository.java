package com.lapmart.lap_mart.repository;

import com.lapmart.lap_mart.model.CartItem;
import com.lapmart.lap_mart.model.Product;
import com.lapmart.lap_mart.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    CartItem findByUserAndProduct(User user, Product product);

}
