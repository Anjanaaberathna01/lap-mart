package com.lapmart.lap_mart.controller;

import ch.qos.logback.core.model.Model;
import com.lapmart.lap_mart.model.Laptop;
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
    public List<Laptop> viewAllLaptops() {
        return productService.getAllLaptops();
    }

    @GetMapping("/{id}")
    public Laptop viewLaptopDetails(@PathVariable Long id) {
        return productService.getLaptopById(id);
    }

}