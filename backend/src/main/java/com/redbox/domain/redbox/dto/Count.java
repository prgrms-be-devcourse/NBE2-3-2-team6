package com.redbox.domain.redbox.dto;

import jakarta.persistence.Embeddable;
import lombok.Getter;

@Getter
@Embeddable
public class Count {
    private final int value;

    protected Count() {
        this.value = 0;
    }

    public Count(int count) {
        if (count < 0) {
            //TODO: ERROR CODE 지정
            throw new IllegalArgumentException("보유량이 0보다 작을 수는 없습니다.");
        }
        this.value = count;
    }

    public Count add(int amount) {
        return new Count(value + amount);
    }

    public Count subtract(int amount) {
        if (this.value < amount) {
            //TODO: ERROR CODE 지정
            throw new IllegalArgumentException("보유량보다 많은 수를 기부 할 수 없습니다.");
        }
        return new Count(value - amount);
    }
}
