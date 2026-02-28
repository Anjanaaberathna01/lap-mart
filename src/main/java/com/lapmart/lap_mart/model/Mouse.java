package com.lapmart.lap_mart.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
@Table(name = "mice")
public class Mouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Brand is required")
    private String brand;

    @Min(value = 0, message = "Price must be non-negative")
    private Double price;

    private String image1;
    private String image2;
    private String image3;
}
