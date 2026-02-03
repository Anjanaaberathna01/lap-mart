// java
    package com.lapmart.lap_mart.controller;

    import com.lapmart.lap_mart.model.User;
    import com.lapmart.lap_mart.repository.UserRepository;
    import com.lapmart.lap_mart.service.CartService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Controller;
    import org.springframework.ui.Model;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.servlet.mvc.support.RedirectAttributes;

    import java.security.Principal;
    import java.util.Collections;
    import java.util.Optional;

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
                              Principal principal,
                              RedirectAttributes redirectAttrs) {

            if (principal == null) {
                redirectAttrs.addFlashAttribute("info", "Please log in to add items to the cart.");
                return "redirect:/login";
            }

            Optional<User> optionalUser = userRepository.findByEmail(principal.getName());
            if (optionalUser.isEmpty()) {
                redirectAttrs.addFlashAttribute("error", "User not found. Please log in again.");
                return "redirect:/login";
            }

            User user = optionalUser.get();
            cartService.addProductToCart(user, productId, quantity);

            return "redirect:/cart";
        }

        @GetMapping
        public String showCartPage(Model model, Principal principal) {
            if (principal == null) {
                model.addAttribute("cartItems", Collections.emptyList());
                model.addAttribute("totalPrice", 0);
                return "cart";
            }

            Optional<User> optionalUser = userRepository.findByEmail(principal.getName());
            if (optionalUser.isEmpty()) {
                model.addAttribute("cartItems", Collections.emptyList());
                model.addAttribute("totalPrice", 0);
                return "cart";
            }

            User user = optionalUser.get();
            model.addAttribute("cartItems", cartService.getCartItems(user));
            model.addAttribute("totalPrice", cartService.getTotalPrice(user));
            return "cart";
        }
    }