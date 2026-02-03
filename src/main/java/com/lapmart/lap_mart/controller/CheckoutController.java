// java
        package com.lapmart.lap_mart.controller;

        import com.lapmart.lap_mart.model.Order;
        import com.lapmart.lap_mart.model.User;
        import com.lapmart.lap_mart.repository.UserRepository;
        import com.lapmart.lap_mart.service.CartService;
        import com.lapmart.lap_mart.service.OrderService;
        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Controller;
        import org.springframework.ui.Model;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.PostMapping;
        import org.springframework.web.bind.annotation.RequestParam;
        import org.springframework.web.servlet.mvc.support.RedirectAttributes;

        import java.security.Principal;
        import java.util.Collections;
        import java.util.Optional;

        @Controller
        public class CheckoutController {

            private static final Logger logger = LoggerFactory.getLogger(CheckoutController.class);

            @Autowired
            private CartService cartService;

            @Autowired
            private OrderService orderService;

            @Autowired
            private UserRepository userRepository;

            @GetMapping("/checkout")
            public String showCheckout(Model model, Principal principal) {
                try {
                    if (principal == null) {
                        model.addAttribute("cartItems", Collections.emptyList());
                        model.addAttribute("totalPrice", 0);
                        return "checkout";
                    }

                    Optional<User> optionalUser = userRepository.findByEmail(principal.getName());
                    if (optionalUser.isEmpty()) {
                        model.addAttribute("cartItems", Collections.emptyList());
                        model.addAttribute("totalPrice", 0);
                        return "checkout";
                    }

                    User user = optionalUser.get();
                    model.addAttribute("cartItems", cartService.getCartItems(user));
                    model.addAttribute("totalPrice", cartService.getTotalPrice(user));
                    return "checkout";
                } catch (Exception ex) {
                    logger.error("Error rendering checkout page", ex);
                    model.addAttribute("cartItems", Collections.emptyList());
                    model.addAttribute("totalPrice", 0);
                    return "checkout";
                }
            }

            @PostMapping("/orders/place")
            public String placeOrder(
                    @RequestParam(required = false) String shippingAddress,
                    @RequestParam(required = false) String phoneNumber,
                    @RequestParam(required = false) String paymentMethod,
                    Principal principal,
                    RedirectAttributes redirectAttrs) {

                if (principal == null) {
                    redirectAttrs.addFlashAttribute("info", "Please log in to complete the purchase.");
                    return "redirect:/login";
                }

                Optional<User> optionalUser = userRepository.findByEmail(principal.getName());
                if (optionalUser.isEmpty()) {
                    redirectAttrs.addFlashAttribute("error", "User not found. Please log in again.");
                    return "redirect:/login";
                }

                User user = optionalUser.get();
                Order order = orderService.placeOrder(user, shippingAddress, phoneNumber, paymentMethod);

                redirectAttrs.addFlashAttribute("successMessage", "Order placed: #" + order.getId());
                return "redirect:/order-success";
            }

            @GetMapping("/order-success")
            public String showOrderSuccess(Model model) {
                // If no flash message present, provide a default message so the page still renders.
                if (!model.containsAttribute("successMessage")) {
                    model.addAttribute("successMessage", "Your order has been received.");
                }
                return "order-success";
            }
        }