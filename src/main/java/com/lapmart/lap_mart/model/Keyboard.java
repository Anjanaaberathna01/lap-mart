package com.lapmart.lap_mart.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "keyboards")
public class Keyboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;

    private double price;

    private String image1;
    private String image2;
    private String image3;

}
