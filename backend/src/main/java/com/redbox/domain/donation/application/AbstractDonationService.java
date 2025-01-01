package com.redbox.domain.donation.application;

import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.redcard.entity.Redcard;
import com.redbox.domain.redcard.repository.RedcardRepository;
import com.redbox.domain.redcard.service.RedcardService;
import com.redbox.domain.user.service.UserService;

import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public abstract class AbstractDonationService implements DonationService {
    protected final UserService userService;
    protected final RedcardRepository redcardRepository;
    protected final RedcardService redcardService;


    protected List<Redcard> getUsersRedCardList(int count) {
        Long donateUserId = userService.getCurrentUserId();
        List<Redcard> redcardList = redcardRepository.findByUserId(donateUserId);

        checkCount(redcardList, count);

        return redcardList.subList(0, count);
    }

    protected Long getDonationUserId() {
        return userService.getCurrentUserId();
    }

    public void checkCount(List<Redcard> redcardList, int count) {
        if (redcardList.size() < count) {
            throw new RuntimeException("보유량 보다 많은 수의 기부를 할 수 없습니다. 보유량 : " + redcardList.size() + " 기부 요청 : " + count);
        }
    }

    public abstract void processDonation(DonationRequest donationRequest);
}
