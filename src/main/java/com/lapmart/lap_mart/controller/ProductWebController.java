package com.lapmart.lap_mart.controller;

import org.springframework.ui.Model;
import com.lapmart.lap_mart.model.Product;
import com.lapmart.lap_mart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/products")
public class ProductWebController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public String viewProducts(Model model) {
        // Fetch all laptops from MySQL
        List<Product> listProducts = productRepository.findAll();
        // Send the list to the HTML page
        model.addAttribute("laptops", listProducts);
        return "products"; // This looks for src/main/resources/templates/index.html
    }
}
