package com.lapmart.lap_mart.service;

import com.lapmart.lap_mart.model.CartItem;
import com.lapmart.lap_mart.model.Laptop;
import com.lapmart.lap_mart.model.User;
import com.lapmart.lap_mart.repository.CartRepository;
import com.lapmart.lap_mart.repository.ProductRepository;
import com.lapmart.lap_mart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CartItem> getCartItems(User user) {
        return cartRepository.findByUser(user);
    }

    public List<CartItem> getCartItems(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return getCartItems(user);
    }

    public void addProductToCart(User user, Long productId, int quantity) {
        Laptop product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existing = cartRepository.findByUserAndProduct(user, product);
        CartItem cartItem;
        if (existing.isPresent()) {
            cartItem = existing.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = new CartItem();
            cartItem.setUser(user);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
        }

        cartRepository.save(cartItem);
    }

    public void addProductToCart(Long userId, Long productId, int quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        addProductToCart(user, productId, quantity);
    }

    public double getTotalAmount(User user) {
        List<CartItem> items = getCartItems(user);
        return items.stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
    }

    public double getTotalPrice(User user) {
        return getTotalAmount(user);
    }

    public double getTotalPrice(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return getTotalPrice(user);
    }

    @Transactional
    public void clearCart(User user) {
        cartRepository.deleteByUser(user);
    }
}
