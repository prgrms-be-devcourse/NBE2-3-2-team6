package com.redbox.domain.redbox.entity;


import com.redbox.domain.redbox.dto.Count;
import com.redbox.global.entity.BaseTimeEntity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Redbox extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "redbox_id")
    private Long id;

    @Embedded
    private Count totalCount;

    @Embedded
    private Count currentCount;

    public Redbox(Count totalCount, Count currentCount) {
        this.totalCount = totalCount;
        this.currentCount = currentCount;
    }

    public int getTotalCount() {
        return totalCount.getValue();
    }

    public int getCurrentCount() {
        return currentCount.getValue();
    }

    //TODO: 동시성 이슈 처리 예정 or Update 형식으로 변경
    public void addCount(int amount) {
        this.totalCount = totalCount.add(amount);
        this.currentCount = currentCount.add(amount);
    }

    public void subCount(int amount) {
        this.currentCount = currentCount.subtract(amount);
    }
}

