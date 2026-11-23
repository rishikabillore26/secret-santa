package com.secretsanta.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public class WishRequest {

    @NotBlank(message = "Product name is required")
    @Size(max = 255, message = "Product name cannot exceed 255 characters")
    private String productName;

    @Pattern(regexp = "^(https?://.+)?$", message = "Product link must be a valid URL starting with http:// or https://")
    @Size(max = 1000, message = "Product link cannot exceed 1000 characters")
    private String productUrl;

    @DecimalMin(value = "0.00", inclusive = true, message = "Price must be a positive number")
    private BigDecimal price;

    @Size(max = 1000, message = "Note cannot exceed 1000 characters")
    private String note;

    public WishRequest() {
    }

    public WishRequest(String productName, String productUrl, BigDecimal price, String note) {
        this.productName = productName;
        this.productUrl = productUrl;
        this.price = price;
        this.note = note;
    }

    public String getProductName() {
        return productName != null ? productName.trim() : null;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductUrl() {
        return productUrl != null ? productUrl.trim() : null;
    }

    public void setProductUrl(String productUrl) {
        this.productUrl = productUrl;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getNote() {
        return note != null ? note.trim() : null;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
