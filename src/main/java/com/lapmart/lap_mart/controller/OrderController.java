package com.lapmart.lap_mart.controller;

import com.lapmart.lap_mart.model.Order;
import com.lapmart.lap_mart.model.User;
import com.lapmart.lap_mart.repository.UserRepository;
import com.lapmart.lap_mart.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired private OrderService orderService;
    @Autowired private UserRepository userRepository;

    @PostMapping("/place")
    public Order checkout(Principal principal) {
        // Get the logged-in user from the security principal
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderService.placeOrder(user);
    }
}