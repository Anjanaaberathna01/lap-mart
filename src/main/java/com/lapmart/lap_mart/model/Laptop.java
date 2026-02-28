package com.lapmart.lap_mart.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
@Table(name = "products")
public class Laptop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @NotBlank(message = "Product name is mandatory")
    private String brand;

    @NotBlank(message = "Product Name is mandatory")
    private String modelName;

    private String processor;
    private String ramSize;

    @Min(value = 0, message = "Price must be non-negative")
    private double price;
    private Integer stockQuantity;
    private String imageUrl1;
    private String imageUrl2;
    private String imageUrl3;

}
