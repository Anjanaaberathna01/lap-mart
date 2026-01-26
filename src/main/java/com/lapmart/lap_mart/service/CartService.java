package com.lapmart.lap_mart.service;

import com.lapmart.lap_mart.model.*;
import com.lapmart.lap_mart.repository.CartRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CartService {
    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public CartItem addToCart(User user, Product product, int quantity) {
        CartItem existingItem = cartRepository.findByUserAndProduct(user, product);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            return cartRepository.save(existingItem);
        }

        CartItem newItem = new CartItem();
        newItem.setUser(user);
        newItem.setProduct(product);
        newItem.setQuantity(quantity);
        return cartRepository.save(newItem);
    }

    public List<CartItem> getCartByUser(User user) {
        return cartRepository.findByUser(user);
    }
}