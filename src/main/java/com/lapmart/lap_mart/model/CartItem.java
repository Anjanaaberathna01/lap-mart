package com.lapmart.lap_mart.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Laptop product;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private int quantity;

}
