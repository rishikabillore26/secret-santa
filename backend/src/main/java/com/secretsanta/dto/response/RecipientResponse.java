package com.secretsanta.dto.response;

import java.util.List;

public class RecipientResponse {
    private String recipientName;
    private List<WishResponse> wishes;

    public RecipientResponse() {
    }

    public RecipientResponse(String recipientName, List<WishResponse> wishes) {
        this.recipientName = recipientName;
        this.wishes = wishes;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public List<WishResponse> getWishes() {
        return wishes;
    }

    public void setWishes(List<WishResponse> wishes) {
        this.wishes = wishes;
    }
}
