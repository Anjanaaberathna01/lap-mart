package com.lapmart.lap_mart.controller;

import com.lapmart.lap_mart.service.UserService;
import com.lapmart.lap_mart.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        // Now 'user' is the correct type from your model package
        userService.registerUser(user);
        return "User registered successfully!";
    }
}