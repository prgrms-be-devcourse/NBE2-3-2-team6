package com.redbox.domain.redcard.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToMany;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Embeddable
public class RedCards {

    @OneToMany(mappedBy = "user")
    private List<RedCard> redCards = new ArrayList<>();

    public int getRedCardsCount() {
        return redCards.size();
    }

    public void addRedCard(RedCard redCard) {
        redCards.add(redCard);
    }

    public void removeRedCard(RedCard redCard) {
        redCards.remove(redCard);
    }
}
