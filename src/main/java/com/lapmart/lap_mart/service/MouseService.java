package com.lapmart.lap_mart.service;

import com.lapmart.lap_mart.model.Mouse;
import com.lapmart.lap_mart.repository.MouseRepository;
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
public class MouseService {

    private final MouseRepository mouseRepository;

    public MouseService(MouseRepository mouseRepository) {
        this.mouseRepository = mouseRepository;
    }

    public List<Mouse> findAll() {
        return mouseRepository.findAll();
    }

    public List<Mouse> findTop5() {
        return mouseRepository.findTop5ByOrderByIdDesc();
    }

    public Optional<Mouse> findById(Long id) {
        return mouseRepository.findById(id);
    }

    public long count() {
        return mouseRepository.count();
    }

    public Mouse saveWithImages(Mouse mouse,
                                MultipartFile image1File,
                                MultipartFile image2File,
                                MultipartFile image3File) throws Exception {
        if (mouse.getId() != null) {
            mouseRepository.findById(mouse.getId()).ifPresent(existing -> {
                if (mouse.getImage1() == null) mouse.setImage1(existing.getImage1());
                if (mouse.getImage2() == null) mouse.setImage2(existing.getImage2());
                if (mouse.getImage3() == null) mouse.setImage3(existing.getImage3());
            });
        }

        Path uploadsDir = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "static", "uploads");
        if (!Files.exists(uploadsDir)) {
            Files.createDirectories(uploadsDir);
        }

        if (image1File != null && !image1File.isEmpty()) {
            mouse.setImage1(saveUploadedFile(image1File, uploadsDir));
        }
        if (image2File != null && !image2File.isEmpty()) {
            mouse.setImage2(saveUploadedFile(image2File, uploadsDir));
        }
        if (image3File != null && !image3File.isEmpty()) {
            mouse.setImage3(saveUploadedFile(image3File, uploadsDir));
        }

        return mouseRepository.save(mouse);
    }

    public void deleteById(Long id) {
        mouseRepository.deleteById(id);
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
}
