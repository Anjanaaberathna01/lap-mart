package com.lapmart.lap_mart.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "User")
@Table(name = "app_users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String fullName;

    private String role;

    private String phoneNumber;
    private String address;
}
