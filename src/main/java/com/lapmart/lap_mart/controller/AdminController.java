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
        import org.springframework.web.multipart.MultipartFile;

        import java.io.IOException;
        import java.nio.file.Files;
        import java.nio.file.Path;
        import java.nio.file.Paths;
        import java.util.List;
        import java.util.Optional;
        import java.nio.file.StandardCopyOption;

        @Controller
        @RequestMapping("/admin")
        public class AdminController {

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
            public String ViewRegisteredUsers(Model model) {
                List<User> listUsers = userRepository.findAll();
                model.addAttribute("users", listUsers);
                return "admin-users";
            }

            // --- ADMIN DASHBOARD ---
            @GetMapping("/dashboard")
            public String adminDashboard(Model model) {
                long totalUsers = userRepository.count();
                long totalProducts = productRepository.count();

                model.addAttribute("totalUsers", totalUsers);
                model.addAttribute("totalProducts", totalProducts);

                return "admin-total";
            }

            // --- ORDER MANAGEMENT (UI) ---

            // show list page
            @GetMapping("/orders")
            public String viewOrders(Model model) {
                List<Order> orders = orderRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
                model.addAttribute("orders", orders);
                return "admin/orders";
            }

            // show single order detail page
            @GetMapping("/orders/{id}")
            public String viewOrderDetail(@PathVariable Long id, Model model, RedirectAttributes redirectAttrs) {
                Optional<Order> opt = orderRepository.findById(id);
                if (opt.isEmpty()) {
                    redirectAttrs.addFlashAttribute("error", "Order not found");
                    return "redirect:/admin/orders";
                }
                model.addAttribute("order", opt.get());
                return "admin/order-detail";
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

            // delete order via admin UI link/button
            @GetMapping("/orders/delete/{id}")
            public String deleteOrderWeb(@PathVariable Long id, RedirectAttributes redirectAttrs) {
                try {
                    orderService.deleteOrder(id);
                    redirectAttrs.addFlashAttribute("success", "Order deleted");
                } catch (Exception ex) {
                    redirectAttrs.addFlashAttribute("error", "Could not delete order: " + ex.getMessage());
                }
                return "redirect:/admin/orders";
            }

            // --- ORDER MANAGEMENT (existing API endpoints kept) ---

            @PutMapping("/orders/{id}/status")
            public Order updateStatus(@PathVariable Long id, @RequestParam String status) {
                return orderService.updateOrderStatus(id, status);
            }

            @DeleteMapping("/orders/{id}")
            public String removeOrder(@PathVariable Long id) {
                orderService.deleteOrder(id);
                return "Order deleted successfully";
            }
        }