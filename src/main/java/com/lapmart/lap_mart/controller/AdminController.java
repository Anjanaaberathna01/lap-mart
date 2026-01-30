package com.lapmart.lap_mart.controller;

import com.lapmart.lap_mart.model.Order;
import com.lapmart.lap_mart.model.Product;
import com.lapmart.lap_mart.model.User;
import com.lapmart.lap_mart.repository.OrderRepository;
import com.lapmart.lap_mart.repository.ProductRepository;
import com.lapmart.lap_mart.repository.UserRepository;
import com.lapmart.lap_mart.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.nio.file.StandardCopyOption;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    // Fixed: Injected the service to avoid "non-static" errors
    @Autowired
    private OrderService orderService;

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

        // 1. Delete the physical files from the 'uploads' folder
        deletePhysicalFile(product.getImageUrl1());
        deletePhysicalFile(product.getImageUrl2());
        deletePhysicalFile(product.getImageUrl3());

        // 2. Delete the record from the database
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
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public String ViewRegisteredUsers(Model model) {

        List<User> listUsers = userRepository.findAll();
        model.addAttribute("users", listUsers);
       //return in admin-users.html
        return "admin-users";
    }

    // --- ADMIN DASHBOARD ---
    @GetMapping("/dashboard") // or your main admin landing page
    public String adminDashboard(Model model) {
        // 1. Get the counts from repositories
        long totalUsers = userRepository.count();
        long totalProducts = productRepository.count();

        // 2. Add these numbers to the model
        model.addAttribute("totalUsers", totalUsers);
        model.addAttribute("totalProducts", totalProducts);

        return "admin-total"; // Your dashboard HTML file
    }



    // --- ORDER MANAGEMENT ---

    @GetMapping("/orders")
    public List<Order> viewAllOrders() {
        return orderRepository.findAll();
    }

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