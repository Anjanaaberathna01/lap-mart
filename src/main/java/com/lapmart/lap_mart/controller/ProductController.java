package com.lapmart.lap_mart.controller;

import com.lapmart.lap_mart.model.Product;
import com.lapmart.lap_mart.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> viewAllLaptops() {
        return productService.getAllLaptops();
    }

    @GetMapping("/{id}")
    public Product viewLaptopDetails(@PathVariable Long id) {
        return productService.getLaptopById(id);
    }
}