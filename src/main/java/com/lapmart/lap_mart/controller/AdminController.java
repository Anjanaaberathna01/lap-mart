package com.lapmart.lap_mart.controller;

import com.lapmart.lap_mart.model.Order;
import com.lapmart.lap_mart.model.Product;
import com.lapmart.lap_mart.model.User;
import com.lapmart.lap_mart.repository.OrderRepository;
import com.lapmart.lap_mart.repository.ProductRepository;
import com.lapmart.lap_mart.repository.UserRepository;
import com.lapmart.lap_mart.service.OrderService;
import com.lapmart.lap_mart.model.Keyboard;
import com.lapmart.lap_mart.repository.KeyboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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

    @Autowired
    private KeyboardRepository keyboardRepository;

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

            // keyboards counts and recent lists
            long totalKeyboards = keyboardRepository.count();

            // recent products (last 5) and recent keyboards (last 5)
            java.util.List<Product> recentProducts = java.util.Collections.emptyList();
            java.util.List<Keyboard> recentKeyboards = java.util.Collections.emptyList();
            try {
                recentProducts = productRepository.findAll(PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "id"))).getContent();
            } catch (Exception ignored) { }

            try {
                recentKeyboards = keyboardRepository.findTop5ByOrderByIdDesc();
            } catch (Exception ignored) { }

            // full products list for fallback in template
            java.util.List<Product> laptops = java.util.Collections.emptyList();
            try {
                laptops = productRepository.findAll();
            } catch (Exception ignored) { }

            model.addAttribute("totalUsers", totalUsers);
            model.addAttribute("totalProducts", totalProducts);
            model.addAttribute("totalOrders", totalOrders);

            model.addAttribute("totalKeyboards", totalKeyboards);
            model.addAttribute("recentProducts", recentProducts);
            model.addAttribute("recentKeyboards", recentKeyboards);
            model.addAttribute("laptops", laptops);
        } catch (Exception ex) {
            // don't fail rendering; show an info box with the message
            model.addAttribute("dbError", ex.getMessage());
            model.addAttribute("totalUsers", 0);
            model.addAttribute("totalProducts", 0);
            model.addAttribute("totalOrders", 0);
        }

        return "admin/admin-dashboard";
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

    // --- KEYBOARD MANAGEMENT (Admin UI) ---
    // list keyboards
    @GetMapping("/keyboards")
    public String listKeyboards(Model model) {
        List<Keyboard> keyboards = keyboardRepository.findAll();
        model.addAttribute("keyboards", keyboards);
        return "admin/admin-keyboards"; // create template admin-keyboards.html
    }

    // show add form
    @GetMapping("/keyboards/add")
    public String showAddKeyboardForm(Model model) {
        model.addAttribute("keyboard", new Keyboard());
        return "admin/keyboard-form"; // create template keyboard-form.html
    }

    // save new keyboard (from form)
    @PostMapping("/keyboards/save")
    public String saveKeyboard(@ModelAttribute Keyboard keyboard,
                               @RequestParam(value = "image1File", required = false) MultipartFile image1File,
                               @RequestParam(value = "image2File", required = false) MultipartFile image2File,
                               @RequestParam(value = "image3File", required = false) MultipartFile image3File,
                               RedirectAttributes redirectAttrs) {
        try {
            // ensure uploads dir exists
            Path uploadsDir = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "static", "uploads");
            if (!Files.exists(uploadsDir)) {
                Files.createDirectories(uploadsDir);
            }

            // Image1
            if (image1File != null && !image1File.isEmpty()) {
                String p = saveUploadedFile(image1File, uploadsDir);
                keyboard.setImage1(p);
            }
            // Image2
            if (image2File != null && !image2File.isEmpty()) {
                String p = saveUploadedFile(image2File, uploadsDir);
                keyboard.setImage2(p);
            }
            // Image3
            if (image3File != null && !image3File.isEmpty()) {
                String p = saveUploadedFile(image3File, uploadsDir);
                keyboard.setImage3(p);
            }

            keyboardRepository.save(keyboard);
            redirectAttrs.addFlashAttribute("success", "Keyboard saved successfully");
            return "redirect:/admin/dashboard";
        } catch (Exception ex) {
            redirectAttrs.addFlashAttribute("error", "Could not save keyboard: " + ex.getMessage());
            return "redirect:/admin/keyboards";
        }
    }

    private String saveUploadedFile(MultipartFile file, Path uploadsDir) throws Exception {
        String original = file.getOriginalFilename();
        String safeName = System.currentTimeMillis() + "_" + (original != null ? original.replaceAll("[^a-zA-Z0-9._-]", "_") : "file");
        Path dest = uploadsDir.resolve(safeName);
        try (InputStream in = file.getInputStream()) {
            Files.copy(in, dest, StandardCopyOption.REPLACE_EXISTING);
        }
        // return web-accessible path (assuming /static is served from root)
        return "/uploads/" + safeName;
    }

    // show edit form
    @GetMapping("/keyboards/edit/{id}")
    public String showEditKeyboardForm(@PathVariable Long id, Model model, RedirectAttributes redirectAttrs) {
        Optional<Keyboard> opt = keyboardRepository.findById(id);
        if (opt.isEmpty()) {
            redirectAttrs.addFlashAttribute("error", "Keyboard not found");
            return "redirect:/admin/keyboards";
        }
        model.addAttribute("keyboard", opt.get());
        return "admin/keyboard-form";
    }

    // delete keyboard
    @PostMapping("/keyboards/delete/{id}")
    public String deleteKeyboard(@PathVariable Long id, RedirectAttributes redirectAttrs) {
        Optional<Keyboard> opt = keyboardRepository.findById(id);
        if (opt.isEmpty()) {
            redirectAttrs.addFlashAttribute("error", "Keyboard not found");
            return "redirect:/admin/keyboards";
        }
        Keyboard k = opt.get();
        // remove image files if present
        deletePhysicalFile(k.getImage1());
        deletePhysicalFile(k.getImage2());
        deletePhysicalFile(k.getImage3());

        keyboardRepository.deleteById(id);
        redirectAttrs.addFlashAttribute("success", "Keyboard deleted");
        return "redirect:/admin/keyboards";
    }
}
