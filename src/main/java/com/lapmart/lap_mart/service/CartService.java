package com.lapmart.lap_mart.service;

import com.lapmart.lap_mart.model.*;
import com.lapmart.lap_mart.repository.CartRepository;
import com.lapmart.lap_mart.repository.ProductRepository;
import com.lapmart.lap_mart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    // Existing API that takes a User
    public List<CartItem> getCartItems(User user) {
        return cartRepository.findByUser(user);
    }

    // Overload: accept userId and resolve User
    public List<CartItem> getCartItems(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return getCartItems(user);
    }

    public void addProductToCart(User user, Long productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cartRepository.findByUserAndProduct(user, product);
        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = new CartItem();
            cartItem.setUser(user);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
        }

        cartRepository.save(cartItem);
    }

    // Overload: accept userId and delegate
    public void addProductToCart(Long userId, Long productId, int quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        addProductToCart(user, productId, quantity);
    }

    // Existing total calculation method
    public double getTotalAmount(User user) {
        List<CartItem> items = getCartItems(user);
        return items.stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
    }

    // Add the expected method name and overloads so callers compile
    public double getTotalPrice(User user) {
        return getTotalAmount(user);
    }

    public double getTotalPrice(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return getTotalPrice(user);
    }
}
