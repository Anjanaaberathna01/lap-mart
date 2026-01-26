package com.lapmart.lap_mart.controller;

import com.lapmart.lap_mart.model.Order;
import com.lapmart.lap_mart.model.Product;
import com.lapmart.lap_mart.repository.OrderRepository;
import com.lapmart.lap_mart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin") // Changed base path to /api/admin
public class AdminController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    // This will be GET /api/admin/products
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // This will be POST /api/admin/products
    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setBrand(productDetails.getBrand());
        product.setModelName(productDetails.getModelName());
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        return productRepository.save(product);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }

    // This will now be GET /api/admin/orders
    @GetMapping("/orders")
    public List<Order> viewAllOrders() {
        return orderRepository.findAll();
    }
}