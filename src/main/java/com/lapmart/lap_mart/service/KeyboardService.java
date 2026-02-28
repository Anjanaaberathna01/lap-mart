package com.lapmart.lap_mart.service;

import com.lapmart.lap_mart.model.Keyboard;
import com.lapmart.lap_mart.repository.KeyboardRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Service
public class KeyboardService {

    private final KeyboardRepository keyboardRepository;

    public KeyboardService(KeyboardRepository keyboardRepository) {
        this.keyboardRepository = keyboardRepository;
    }

    public List<Keyboard> findAll() {
        return keyboardRepository.findAll();
    }

    public List<Keyboard> findTop5() {
        return keyboardRepository.findTop5ByOrderByIdDesc();
    }

    public Optional<Keyboard> findById(Long id) {
        return keyboardRepository.findById(id);
    }

    public Keyboard saveKeyboard(Keyboard keyboard,
                                 MultipartFile image1File,
                                 MultipartFile image2File,
                                 MultipartFile image3File) throws Exception {
        // Preserve existing images on edit (when files are not re-uploaded)
        if (keyboard.getId() != null) {
            keyboardRepository.findById(keyboard.getId()).ifPresent(existing -> {
                if (keyboard.getImage1() == null) keyboard.setImage1(existing.getImage1());
                if (keyboard.getImage2() == null) keyboard.setImage2(existing.getImage2());
                if (keyboard.getImage3() == null) keyboard.setImage3(existing.getImage3());
            });
        }

        // ensure uploads dir exists
        Path uploadsDir = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "static", "uploads");
        if (!Files.exists(uploadsDir)) {
            Files.createDirectories(uploadsDir);
        }

        // Image1
        if (image1File != null && !image1File.isEmpty()) {
            try {
                String p = saveUploadedFile(image1File, uploadsDir);
                keyboard.setImage1(p);
            } catch (Exception e) {
                // log and continue; don't fail entire save for upload problems
                System.err.println("Failed to save image1: " + e.getMessage());
                e.printStackTrace();
            }
        }
        // Image2
        if (image2File != null && !image2File.isEmpty()) {
            try {
                String p = saveUploadedFile(image2File, uploadsDir);
                keyboard.setImage2(p);
            } catch (Exception e) {
                System.err.println("Failed to save image2: " + e.getMessage());
                e.printStackTrace();
            }
        }
        // Image3
        if (image3File != null && !image3File.isEmpty()) {
            try {
                String p = saveUploadedFile(image3File, uploadsDir);
                keyboard.setImage3(p);
            } catch (Exception e) {
                System.err.println("Failed to save image3: " + e.getMessage());
                e.printStackTrace();
            }
        }

        return keyboardRepository.save(keyboard);
    }

    public void deleteById(Long id) throws Exception {
        Optional<Keyboard> opt = keyboardRepository.findById(id);
        if (opt.isEmpty()) return;
        Keyboard k = opt.get();
        deletePhysicalFile(k.getImage1());
        deletePhysicalFile(k.getImage2());
        deletePhysicalFile(k.getImage3());
        keyboardRepository.deleteById(id);
    }

    private String saveUploadedFile(MultipartFile file, Path uploadsDir) throws Exception {
        String original = file.getOriginalFilename();
        String safeName = System.currentTimeMillis() + "_" + (original != null ? original.replaceAll("[^a-zA-Z0-9._-]", "_") : "file");
        Path dest = uploadsDir.resolve(safeName);
        try (InputStream in = file.getInputStream()) {
            Files.copy(in, dest, StandardCopyOption.REPLACE_EXISTING);
        }
        return "/uploads/" + safeName;
    }

    private void deletePhysicalFile(String relativePath) {
        if (relativePath != null && !relativePath.isEmpty()) {
            try {
                Path filePath = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "static", relativePath.startsWith("/") ? relativePath.substring(1) : relativePath);
                Files.deleteIfExists(filePath);
            } catch (Exception ignored) {
            }
        }
    }
}
