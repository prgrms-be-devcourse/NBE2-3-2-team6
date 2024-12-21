package com.redbox.domain.redcard.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Embeddable
public class RedCards {

    private List<RedCard> redCards = new ArrayList<>();

    public void addRedCard(RedCard redCard) {
        redCards.add(redCard);
    }

    public void removeRedCard(RedCard redCard) {
        redCards.remove(redCard);
    }
}
