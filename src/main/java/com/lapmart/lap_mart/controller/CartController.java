package com.lapmart.lap_mart.controller;

import com.lapmart.lap_mart.model.User;
import com.lapmart.lap_mart.repository.UserRepository;
import com.lapmart.lap_mart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add/{productId}")
    public String addItem(@PathVariable Long productId,
                          @RequestParam(defaultValue = "1") int quantity,
                          Principal principal) {

        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        cartService.addProductToCart(user, productId ,quantity );

        return "redirect:/cart";
    }

    @GetMapping
    public String showCartPage(Model model, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).get();
        model.addAttribute("cartItems", cartService.getCartItems(user));
        model.addAttribute("totalPrice", cartService.getTotalPrice(user));
        return "cart"; // This looks for src/main/resources/templates/cart.html
    }
}
