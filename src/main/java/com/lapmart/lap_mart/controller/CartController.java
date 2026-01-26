package com.lapmart.lap_mart.controller;

import com.lapmart.lap_mart.model.User;
import com.lapmart.lap_mart.repository.UserRepository;
import com.lapmart.lap_mart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository; // To find the logged-in user

    @PostMapping("/add/{productId}/{quantity}")
    public String addItem(@PathVariable Long productId, @PathVariable int quantity, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).get();
        return "Added to cart!";
    }
}
