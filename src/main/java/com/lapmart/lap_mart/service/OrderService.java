package com.lapmart.lap_mart.service;

import com.lapmart.lap_mart.model.CartItem;
import com.lapmart.lap_mart.model.Order;
import com.lapmart.lap_mart.model.OrderItem;
import com.lapmart.lap_mart.model.Laptop;
import com.lapmart.lap_mart.model.User;
import com.lapmart.lap_mart.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    /**
     * Convenience overload used by API controller that doesn't supply shipping/payment.
     */
    @Transactional
    public Order placeOrder(User user) {
        return placeOrder(user, null, null, null);
    }

    /**
     * Create Order from user's cart, persist and clear cart.
     */
    @Transactional
    public Order placeOrder(User user, String shippingAddress, String phoneNumber, String paymentMethod) {
        List<CartItem> cartItems = cartService.getCartItems(user);
        if (cartItems == null || cartItems.isEmpty()) {
            throw new IllegalStateException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(shippingAddress);
        order.setPhoneNumber(phoneNumber);
        order.setPaymentMethod(paymentMethod);

        BigDecimal total = BigDecimal.ZERO;
        for (CartItem ci : cartItems) {
            Laptop p = ci.getProduct();
            BigDecimal unit = BigDecimal.valueOf(p.getPrice());
            int qty = ci.getQuantity();
            OrderItem oi = new OrderItem(p.getId(), p.getBrand() + " " + p.getModelName(), unit, qty);
            oi.setOrder(order);
            order.getItems().add(oi);
            total = total.add(oi.getSubtotal());
        }
        order.setTotalPrice(total);

        Order saved = orderRepository.save(order);

        cartService.clearCart(user);

        return saved;
    }

    /**
     * Update order status
     */
    @Transactional
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    /**
     * Delete order
     */
    @Transactional
    public void deleteOrder(Long orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new RuntimeException("Order not found: " + orderId);
        }
        orderRepository.deleteById(orderId);
    }

    /**
     *
     * get order from repo
     */
    public OrderService(OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }
    public Order findByIDOrThrow(Long id){
        return orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order is not found: " + id));
    }

}
