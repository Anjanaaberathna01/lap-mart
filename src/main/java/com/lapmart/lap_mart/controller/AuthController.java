package com.lapmart.lap_mart.controller;

import org.springframework.ui.Model;
import com.lapmart.lap_mart.repository.UserRepository;
import com.lapmart.lap_mart.service.UserService;
import com.lapmart.lap_mart.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userService.registerUser(user);
        return "User registered successfully!";
    }

}