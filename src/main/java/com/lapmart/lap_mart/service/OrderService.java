package com.lapmart.lap_mart.service;

import com.lapmart.lap_mart.model.*;
import com.lapmart.lap_mart.repository.CartRepository;
import com.lapmart.lap_mart.repository.OrderRepository;
import com.lapmart.lap_mart.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired private CartRepository cartRepository;
    @Autowired private ProductRepository productRepository;

    @Transactional
    public Order placeOrder(User user) {
        List<CartItem> cartItems = cartRepository.findByUser(user);
        if (cartItems.isEmpty()) throw new RuntimeException("Cart is empty");

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");

        double total = 0;
        List<OrderItem> items = new ArrayList<>();

        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();

            // Check Stock
            if (product.getStockQuantity() < cartItem.getQuantity()) {
                throw new RuntimeException("Not enough stock for: " + product.getModelName());
            }

            // Update Stock
            product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());
            productRepository.save(product);

            // Create Order Item
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPriceAtPurchase(product.getPrice());

            total += product.getPrice() * cartItem.getQuantity();
            items.add(orderItem);
        }

        order.setTotalAmount(total);
        order.setOrderItems(items);

        cartRepository.deleteAll(cartItems); // Clear the cart
        return orderRepository.save(order);
    }
    public Order updateOrderStatus(Long orderId, String status) {
        // Now this can correctly access the non-static orderRepository
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    // 2. REMOVED 'static' keyword here
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }

}