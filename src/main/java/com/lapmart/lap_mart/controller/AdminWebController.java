package com.lapmart.lap_mart.controller;

import com.lapmart.lap_mart.model.Product;
import com.lapmart.lap_mart.repository.ProductRepository;
import com.lapmart.lap_mart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.List;

@Controller
@RequestMapping("/admin/products")
public class AdminWebController {

    @Autowired
    private ProductRepository productRepository;

    // View List
    @GetMapping
    public String listProducts(Model model) {
        List<Product> laptops = productRepository.findAll();
        model.addAttribute("laptops", laptops);
        return "admin-products"; // admin-products.html
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("product", new Product());
        return "product-form"; // product-form.html
    }

    @PostMapping("/save")
    public String saveProduct(@ModelAttribute("product") Product product,
                              @RequestParam("file1") MultipartFile file1,
                              @RequestParam("file2") MultipartFile file2,
                              @RequestParam("file3") MultipartFile file3) {
        try {
            // Check if we are EDITING an existing product
            if (product.getId() != null) {
                Product existingProduct = productRepository.findById(product.getId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));

                // If a new file is uploaded, save it. Otherwise, keep the OLD image path.
                if (!file1.isEmpty()) product.setImageUrl1(uploadImage(file1));
                else product.setImageUrl1(existingProduct.getImageUrl1());

                if (!file2.isEmpty()) product.setImageUrl2(uploadImage(file2));
                else product.setImageUrl2(existingProduct.getImageUrl2());

                if (!file3.isEmpty()) product.setImageUrl3(uploadImage(file3));
                else product.setImageUrl3(existingProduct.getImageUrl3());
            } else {
                if (!file1.isEmpty()) product.setImageUrl1(uploadImage(file1));
                if (!file2.isEmpty()) product.setImageUrl2(uploadImage(file2));
                if (!file3.isEmpty()) product.setImageUrl3(uploadImage(file3));
            }

            // Because 'product' now has the ID, this will perform an UPDATE
            productRepository.save(product);

        } catch (IOException e) {
            e.printStackTrace();
            return "redirect:/admin/products/add?error";
        }
        return "redirect:/admin/products";
    }

    // 4. Delete Product & Physical Files
    @GetMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Remove files from disk first
        deletePhysicalFile(product.getImageUrl1());
        deletePhysicalFile(product.getImageUrl2());
        deletePhysicalFile(product.getImageUrl3());

        productRepository.delete(product);
        return "redirect:/admin/products";
    }

    private String uploadImage(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path uploadDir = Paths.get("src/main/resources/static/uploads");
        if (!Files.exists(uploadDir)) Files.createDirectories(uploadDir);

        try (InputStream inputStream = file.getInputStream()) {
            Path filePath = uploadDir.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        }
        return "/uploads/" + fileName;
    }

    private void deletePhysicalFile(String relativePath) {
        if (relativePath != null) {
            try {
                Path filePath = Paths.get("src/main/resources/static" + relativePath);
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Long id, Model model) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid product Id:" + id));

        model.addAttribute("product", product);
        return "product-form"; // We reuse the same form!
    }


    @Autowired
    private UserRepository userRepository;

    @GetMapping("/dashboard")
    public String adminDashboard(Model model) {
        model.addAttribute("laptops", productRepository.count());
        model.addAttribute("users", userRepository.count());
        return "admin-total";
    }
}