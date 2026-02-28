package com.lapmart.lap_mart.model;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;

@Entity
@Data
@Table(name = "monitors")
public class Monitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Brand is required")
    private String brand;

    @Min(value = 0, message = "Price must be non-negative")
    private Double price;

    private Integer stockQuantity;

    private String image1;
    private String image2;
    private String image3;
}
