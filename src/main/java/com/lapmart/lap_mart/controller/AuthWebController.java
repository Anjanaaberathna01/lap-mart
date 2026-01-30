package com.lapmart.lap_mart.controller;

import com.lapmart.lap_mart.model.User;
import com.lapmart.lap_mart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AuthWebController {

    private final UserService userService;

    @Autowired
    public AuthWebController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }


    @PostMapping("/register/save")
    public String saveUser(@ModelAttribute("user") User user) {
        userService.registerUser(user);
        return "redirect:/login?success";
    }
}
