
package com.lapmart.lap_mart.repository;

import com.lapmart.lap_mart.model.CartItem;
import com.lapmart.lap_mart.model.Product;
import com.lapmart.lap_mart.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    Optional<CartItem> findByUserAndProductId(User user, Long productId);

    // added: supports CartService.findByUserAndProduct(user, product)
    Optional<CartItem> findByUserAndProduct(User user, Product product);

    void deleteByUser(User user);
}