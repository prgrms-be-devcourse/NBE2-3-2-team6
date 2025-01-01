package com.redbox.domain.redbox.entity;

import com.redbox.domain.redbox.dto.Count;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Entity
@Table(name = "redbox_receipt_groups")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RedboxReceiptGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "redbox_receipt_group_id")
    private Long id;

    private Long requestId;

    @AttributeOverride(name = "value", column = @Column(name = "receipt_amount"))
    private Count receiptAmount;

    private LocalDate recepitDate;
}

