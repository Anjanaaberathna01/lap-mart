package com.lapmart.lap_mart.controller;

import com.lapmart.lap_mart.model.Order;
import com.lapmart.lap_mart.model.Product;
import com.lapmart.lap_mart.repository.OrderRepository;
import com.lapmart.lap_mart.repository.ProductRepository;
import com.lapmart.lap_mart.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    // Fixed: Injected the service to avoid "non-static" errors
    @Autowired
    private OrderService orderService;

    // --- PRODUCT MANAGEMENT ---

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

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

    @DeleteMapping("/products/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return "Product deleted successfully";
    }

    // --- ORDER MANAGEMENT ---

    // Fixed: Path is now /api/admin/orders (Unique from /products)
    @GetMapping("/orders")
    public List<Order> viewAllOrders() {
        return orderRepository.findAll();
    }

    @PutMapping("/orders/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestParam String status) {
        // Fixed: Called via the injected 'orderService' instance
        return orderService.updateOrderStatus(id, status);
    }

    @DeleteMapping("/orders/{id}")
    public String removeOrder(@PathVariable Long id) {
        // Fixed: Called via the injected 'orderService' instance
        orderService.deleteOrder(id);
        return "Order deleted successfully";
    }
}