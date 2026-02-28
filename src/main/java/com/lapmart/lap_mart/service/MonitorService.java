package com.lapmart.lap_mart.service;

import com.lapmart.lap_mart.model.Monitor;
import com.lapmart.lap_mart.repository.MonitorRepository;
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
public class MonitorService {

    private final MonitorRepository monitorRepository;

    public MonitorService(MonitorRepository monitorRepository) {
        this.monitorRepository = monitorRepository;
    }

    public List<Monitor> findAll() {
        return monitorRepository.findAll();
    }

    public List<Monitor> findTop5() {
        return monitorRepository.findTop5ByOrderByIdDesc();
    }

    public Optional<Monitor> findById(Long id) {
        return monitorRepository.findById(id);
    }

    public Monitor save(Monitor monitor) {
        return monitorRepository.save(monitor);
    }

    public Monitor saveWithImages(Monitor monitor,
                                  MultipartFile image1File,
                                  MultipartFile image2File,
                                  MultipartFile image3File) throws Exception {
        // Preserve existing images on edit (when files are not re-uploaded)
        if (monitor.getId() != null) {
            monitorRepository.findById(monitor.getId()).ifPresent(existing -> {
                if (monitor.getImage1() == null) monitor.setImage1(existing.getImage1());
                if (monitor.getImage2() == null) monitor.setImage2(existing.getImage2());
                if (monitor.getImage3() == null) monitor.setImage3(existing.getImage3());
            });
        }

        Path uploadsDir = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "static", "uploads");
        if (!Files.exists(uploadsDir)) {
            Files.createDirectories(uploadsDir);
        }

        if (image1File != null && !image1File.isEmpty()) {
            monitor.setImage1(saveUploadedFile(image1File, uploadsDir));
        }
        if (image2File != null && !image2File.isEmpty()) {
            monitor.setImage2(saveUploadedFile(image2File, uploadsDir));
        }
        if (image3File != null && !image3File.isEmpty()) {
            monitor.setImage3(saveUploadedFile(image3File, uploadsDir));
        }

        return monitorRepository.save(monitor);
    }

    public void deleteById(Long id) {
        monitorRepository.deleteById(id);
    }

    public long count() {
        return monitorRepository.count();
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
