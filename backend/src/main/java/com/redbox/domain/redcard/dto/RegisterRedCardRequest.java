package com.redbox.domain.redcard.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class RegisterRedCardRequest {
    //TODO: valid 처리
    private String cardNumber;
    private Date donationDate;
    //TODO: ERD에 존재하지 않는 컬럼, 어떻게 할 것인지 논의 필요.
    private String hospitalName;
}
