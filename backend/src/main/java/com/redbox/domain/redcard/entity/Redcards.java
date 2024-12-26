package com.redbox.domain.redcard.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;

@Embeddable
public class Redcards {

    @OneToMany(mappedBy = "user")
    private List<Redcard> redcards = new ArrayList<>();

    public int getRedcardsCount() {
        return redcards.size();
    }

    public void addRedcard(Redcard redcard) {
        redcards.add(redcard);
    }

    public void removeRedcard(Redcard redcard) {
        redcards.remove(redcard);
    }
}
