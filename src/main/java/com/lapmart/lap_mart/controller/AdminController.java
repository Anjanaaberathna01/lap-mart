package com.lapmart.lap_mart.controller;

import com.lapmart.lap_mart.model.Order;
import com.lapmart.lap_mart.model.Product;
import com.lapmart.lap_mart.model.User;
import com.lapmart.lap_mart.repository.OrderRepository;
import com.lapmart.lap_mart.repository.ProductRepository;
import com.lapmart.lap_mart.repository.UserRepository;
import com.lapmart.lap_mart.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.security.Principal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    // --- PRODUCT MANAGEMENT ---

    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setBrand(productDetails.getBrand());
        product.setModelName(productDetails.getModelName());
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());

        return productRepository.save(product);
    }

    @GetMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        deletePhysicalFile(product.getImageUrl1());
        deletePhysicalFile(product.getImageUrl2());
        deletePhysicalFile(product.getImageUrl3());

        productRepository.delete(product);

        return "redirect:/admin/products";
    }

    private void deletePhysicalFile(String relativePath) {
        if (relativePath != null && !relativePath.isEmpty()) {
            try {
                Path filePath = Paths.get(System.getProperty("user.dir") + "/src/main/resources/static" + relativePath);
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                System.err.println("Could not delete file: " + relativePath);
            }
        }
    }

    //--- USER MANAGEMENT ---
    @GetMapping("/users")
    public String listUsers(Model model, Principal principal) {
        List<User> listUsers = userRepository.findAll();
        model.addAttribute("users", listUsers);
        try {
            if (principal != null) {
                User current = userRepository.findByEmail(principal.getName()).orElse(null);
                model.addAttribute("currentUserRole", current != null ? current.getRole() : null);
            } else {
                model.addAttribute("currentUserRole", null);
            }
        } catch (Exception ignored) {
            model.addAttribute("currentUserRole", null);
        }
        return "admin/admin-users";
    }

    // Deactivate user
    @PostMapping("/users/{id}/deactivate")
    public String deactivateUser(@PathVariable Long id, RedirectAttributes redirectAttrs, Principal principal) {
        try {
            User admin = userRepository.findByEmail(principal.getName()).orElse(null);
            if (admin == null || !"ROLE_ADMIN".equals(admin.getRole())) {
                redirectAttrs.addFlashAttribute("error","Access denied");
                return "redirect:/admin/users";
            }
            User u = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            u.setEnabled(false);
            userRepository.save(u);
            redirectAttrs.addFlashAttribute("success","User deactivated");
        } catch (Exception ex) {
            redirectAttrs.addFlashAttribute("error","Could not deactivate user: " + ex.getMessage());
        }
        return "redirect:/admin/users";
    }

    // Reactivate user
    @PostMapping("/users/{id}/activate")
    public String activateUser(@PathVariable Long id, RedirectAttributes redirectAttrs, Principal principal) {
        try {
            User admin = userRepository.findByEmail(principal.getName()).orElse(null);
            if (admin == null || !"ROLE_ADMIN".equals(admin.getRole())) {
                redirectAttrs.addFlashAttribute("error","Access denied");
                return "redirect:/admin/users";
            }
            User u = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            u.setEnabled(true);
            userRepository.save(u);
            redirectAttrs.addFlashAttribute("success","User activated");
        } catch (Exception ex) {
            redirectAttrs.addFlashAttribute("error","Could not activate user: " + ex.getMessage());
        }
        return "redirect:/admin/users";
    }

    // Delete user
    @PostMapping("/users/{id}/delete")
    public String deleteUser(@PathVariable Long id, RedirectAttributes redirectAttrs, Principal principal) {
        try {
            User admin = userRepository.findByEmail(principal.getName()).orElse(null);
            if (admin == null || !"ROLE_ADMIN".equals(admin.getRole())) {
                redirectAttrs.addFlashAttribute("error","Access denied");
                return "redirect:/admin/users";
            }
            userRepository.deleteById(id);
            redirectAttrs.addFlashAttribute("success","User deleted");
        } catch (Exception ex) {
            redirectAttrs.addFlashAttribute("error","Could not delete user: " + ex.getMessage());
        }
        return "redirect:/admin/users";
    }

    // --- ADMIN DASHBOARD ---
    @GetMapping("/dashboard")
    public String adminDashboard(Model model) {
        try {
            long totalUsers = userRepository.count();
            long totalProducts = productRepository.count();
            long totalOrders = orderRepository.count();

            model.addAttribute("totalUsers", totalUsers);
            model.addAttribute("totalProducts", totalProducts);
            model.addAttribute("totalOrders", totalOrders);
        } catch (Exception ex) {
            // don't fail rendering; show an info box with the message
            model.addAttribute("dbError", ex.getMessage());
            model.addAttribute("totalUsers", 0);
            model.addAttribute("totalProducts", 0);
            model.addAttribute("totalOrders", 0);
        }

        return "admin/admin-total";
    }

    // --- ORDER MANAGEMENT (UI) ---

    // show list page
    @GetMapping("/orders")
    public String viewOrders(Model model, Principal principal) {
        List<Order> orders = orderRepository.findAllWithUser();
        logger.info("Admin viewOrders fetched {} orders", orders != null ? orders.size() : 0);
        model.addAttribute("orders", orders);
        // Put current user's role into the model so template can conditionally render admin actions
        try {
            if (principal != null) {
                User current = userRepository.findByEmail(principal.getName()).orElse(null);
                model.addAttribute("currentUserRole", current != null ? current.getRole() : null);
            } else {
                model.addAttribute("currentUserRole", null);
            }
        } catch (Exception ignored) {
            model.addAttribute("currentUserRole", null);
        }
        return "admin/admin-orders";
    }

    // show orders for a Admin
    @GetMapping("/users/{id}/orders")
    public String viewOrdersByUser(@PathVariable Long id, Model model, Principal principal, RedirectAttributes redirectAttrs) {
        Optional<User> optUser = userRepository.findById(id);
        if (optUser.isEmpty()) {
            redirectAttrs.addFlashAttribute("error", "User not found");
            return "redirect:/admin/users";
        }
        User user = optUser.get();
        List<Order> orders = orderRepository.findByUser(user);
        model.addAttribute("orders", orders);
        model.addAttribute("filterUser", user);

        // current user role for template (same logic as viewOrders)
        try {
            if (principal != null) {
                User current = userRepository.findByEmail(principal.getName()).orElse(null);
                model.addAttribute("currentUserRole", current != null ? current.getRole() : null);
            } else {
                model.addAttribute("currentUserRole", null);
            }
        } catch (Exception ignored) {
            model.addAttribute("currentUserRole", null);
        }

        return "admin/admin-orders";
    }

    // show single order detail page
    @GetMapping("/orders/{id}")
    public String viewOrderDetail(@PathVariable Long id, Model model, RedirectAttributes redirectAttrs, Principal principal) {
        Optional<Order> opt = orderRepository.findByIdWithItems(id);
        if (opt.isEmpty()) {
            redirectAttrs.addFlashAttribute("error", "Order not found");
            return "redirect:/admin/orders";
        }
        Order order = opt.get();
        model.addAttribute("order", order);
        // add current user role so the template can show admin-only controls
        try {
            if (principal != null) {
                User current = userRepository.findByEmail(principal.getName()).orElse(null);
                model.addAttribute("currentUserRole", current != null ? current.getRole() : null);
            } else {
                model.addAttribute("currentUserRole", null);
            }
        } catch (Exception ignored) {
            model.addAttribute("currentUserRole", null);
        }
        return "admin/admin-order-details";
    }

    // handle status update from admin form (redirect back to list)
    @PostMapping("/orders/{id}/status")
    public String updateStatusFromForm(@PathVariable Long id, @RequestParam String status, RedirectAttributes redirectAttrs) {
        try {
            orderService.updateOrderStatus(id, status);
            redirectAttrs.addFlashAttribute("success", "Order status updated");
        } catch (Exception ex) {
            redirectAttrs.addFlashAttribute("error", "Could not update status: " + ex.getMessage());
        }
        return "redirect:/admin/orders";
    }

    // delete order via admin
    @PostMapping("/orders/delete/{id}")
    public String deleteOrderWeb(@PathVariable Long id, RedirectAttributes redirectAttrs, Principal principal) {
        try {
            if (principal == null) {
                redirectAttrs.addFlashAttribute("error", "You must be logged in to delete orders");
                return "redirect:/admin/orders";
            }
            User current = userRepository.findByEmail(principal.getName()).orElse(null);
            if (current == null || !"ROLE_ADMIN".equals(current.getRole())) {
                redirectAttrs.addFlashAttribute("error", "Access denied: admin only");
                return "redirect:/admin/orders";
            }

            orderService.deleteOrder(id);
            redirectAttrs.addFlashAttribute("success", "Order deleted");
        } catch (Exception ex) {
            redirectAttrs.addFlashAttribute("error", "Could not delete order: " + ex.getMessage());
        }
        return "redirect:/admin/orders";
    }

    // Debug endpoint to return orders as JSON so we can verify the repository returns data
    @GetMapping("/orders/json")
    @ResponseBody
    public List<Order> ordersJson() {
        List<Order> orders = orderRepository.findAllWithUser();
        logger.info("ordersJson returning {} orders", orders != null ? orders.size() : 0);
        return orders;
    }
}
