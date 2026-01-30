package com.lapmart.lap_mart.config;

import com.lapmart.lap_mart.model.User;
import com.lapmart.lap_mart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (UserRepository.findByEmail("admin@lapmart.com").isEmpty())
        {
            User admin = new User();
            admin.setEmail("admin@lapmart.com");
            admin.setPassword(passwordEncoder.encode("12345678"));

            admin.setRole("ROLE_ADMIN");
            UserRepository.save(admin);
        }

    }

}
