package com.lapmart.lap_mart.service;

import com.lapmart.lap_mart.model.Product;
import com.lapmart.lap_mart.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllLaptops() {
        return productRepository.findAll();
    }

    public Product getLaptopById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
}