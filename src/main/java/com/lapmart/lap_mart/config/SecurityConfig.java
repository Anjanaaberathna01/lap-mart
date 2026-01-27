package com.lapmart.lap_mart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Keep disabled for now to simplify development
                .authorizeHttpRequests(auth -> auth
                        // 0. Allow access to your new Web/Thymeleaf routes
                        .requestMatchers("/", "/products/**", "/api/auth/**", "/h2-console/**").permitAll()

                        // 1. Protect Admin Product Management routes
                        .requestMatchers("/admin/products/**").hasRole("ADMIN")

                        // 2. Protect Admin web and API routes
                        .requestMatchers("/admin/**", "/api/admin/**").hasRole("ADMIN")

                        // 3. Any other request (like Cart or Orders) requires login
                        .anyRequest().authenticated()
                )
                // 4. Enable Form-based login (Browser style)
                .formLogin(form -> form
                        .defaultSuccessUrl("/products", true) // Where to go after login
                        .permitAll()
                )
                // 5. Enable Basic Auth (Keep this so Postman still works)
                .httpBasic(Customizer.withDefaults())

                // 6. Handle Logout
                .logout(logout -> logout
                        .logoutSuccessUrl("/products")
                        .permitAll()
                )
                // Keep this for H2 console if you still use it occasionally
                .headers(headers -> headers.frameOptions(f -> f.disable()));

        return http.build();
    }

}