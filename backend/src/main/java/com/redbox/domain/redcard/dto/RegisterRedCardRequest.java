package com.redbox.domain.redcard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRedCardRequest {
    //TODO: valid 처리
    private String cardNumber;
    private LocalDate donationDate;
    //TODO: ERD에 존재하지 않는 컬럼, 어떻게 할 것인지 논의 필요.
    private String hospitalName;
}
