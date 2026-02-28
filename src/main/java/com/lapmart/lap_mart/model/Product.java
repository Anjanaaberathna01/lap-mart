package com.lapmart.lap_mart.model;

/**
 * Compatibility adapter: older code may import `Product`. We keep a small class
 * named Product that extends the new `Laptop` entity so both names work
 * without duplicating JPA entity definitions.
 */
public class Product extends Laptop {
    // empty - inherits all fields from Laptop
}
