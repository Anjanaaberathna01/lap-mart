package com.lapmart.lap_mart.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private CustomAuthenticationSuccessHandler successHandler;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Keep disabled for Postman testing
                .authorizeHttpRequests(auth -> auth
                        // 1. PUBLIC ASSETS & AUTHENTICATION
                        // We permit these so that the login page can actually load without redirecting to itself
                        .requestMatchers("/", "/login", "/register/**", "/api/auth/**", "/uploads/**", "/css/**", "/js/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()

                        // 2. ADMIN ONLY
                        // Ensure your DB 'role' column values are exactly "ROLE_ADMIN"
                        .requestMatchers("/admin/**", "/api/admin/**").hasAuthority("ROLE_ADMIN")

                        // 3. LOGGED-IN USERS (Products/Cart/etc)
                        .requestMatchers("/products/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")

                        // 4. CATCH-ALL
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")             // Your custom login controller route
                        .loginProcessingUrl("/login")
                        .successHandler(successHandler)
                        .failureUrl("/login?error=true")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/")
                        .permitAll()
                )
                // This prevents a redirect loop if a User tries to access Admin pages
                .exceptionHandling(ex -> ex.accessDeniedPage("/login?denied=true"))

                .headers(headers -> headers.frameOptions(f -> f.disable()));

        return http.build();
    }
}