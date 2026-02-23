package com.lapmart.lap_mart.service;

import com.lapmart.lap_mart.model.User;
import com.lapmart.lap_mart.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import static org.thymeleaf.util.StringUtils.equalsIgnoreCase;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(BCryptPasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public void registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if("admin@lapmart.com".equalsIgnoreCase(user.getEmail())) {
            user.setRole("ROLE_ADMIN");
        }
        else if(user.getRole() == null) {
            user.setRole("ROLE_USER");
        }

        userRepository.save(user);
    }
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public User updateUserProfile(String email, User profileData) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(profileData.getFullName());
        user.setPhoneNumber(profileData.getPhoneNumber());
        user.setAddress(profileData.getAddress());

        return userRepository.save(user);
    }

    public void changePassword(String email, String oldPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Invalid old password");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}