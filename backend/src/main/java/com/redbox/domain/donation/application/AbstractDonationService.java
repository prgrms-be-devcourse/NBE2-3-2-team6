package com.redbox.domain.donation.application;

import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.donation.entity.DonationDetail;
import com.redbox.domain.donation.entity.DonationGroup;
import com.redbox.domain.donation.entity.DonationType;
import com.redbox.domain.donation.exception.DonationAmountExceededException;
import com.redbox.domain.donation.repository.DonationDetailRepository;
import com.redbox.domain.donation.repository.DonationGroupRepository;
import com.redbox.domain.redcard.entity.Redcard;
import com.redbox.domain.redcard.repository.RedcardRepository;
import com.redbox.domain.redcard.service.RedcardService;
import com.redbox.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
public abstract class AbstractDonationService implements DonationService {
    protected final UserService userService;
    protected final RedcardRepository redcardRepository;
    protected final RedcardService redcardService;
    protected final DonationGroupRepository donationGroupRepository;
    protected final DonationDetailRepository donationDetailRepository;

    public abstract void processDonation(DonationRequest donationRequest);

    public abstract void validateDonation(List<Redcard> redcardList, DonationRequest donationRequest);

    protected List<Redcard> getUsersRedCardList() {
        Long donateUserId = userService.getCurrentUserId();
        return redcardRepository.findByUserId(donateUserId);
    }

    protected List<Redcard> pickDonateRedCardList(DonationRequest donationRequest) {
        List<Redcard> redcardList = getUsersRedCardList();
        validateDonation(redcardList, donationRequest);
        return redcardList.subList(0, donationRequest.getAmount());
    }

    protected Long getDonationUserId() {
        return userService.getCurrentUserId();
    }

    protected DonationGroup createDonationGroup(long donationUserId, long
            receiverId, DonationType donationType, int donationCount, String donationMessage) {
        DonationGroup redboxDonationGroup = DonationGroup.builder()
                                                         .donorId(donationUserId)
                                                         .receiverId(receiverId)
                                                         .donationType(donationType)
                                                         .donationAmount(donationCount)
                                                         .donationDate(LocalDate.now())
                                                         .donationMessage(donationMessage)
                                                         .build();

        return donationGroupRepository.save(redboxDonationGroup);
    }

    protected void saveDonationDetails(List<Redcard> redcardList, Long donationGroupId) {
        for (Redcard redcard : redcardList) {
            DonationDetail donationDetail = DonationDetail.builder().
                                                          donationGroupId(donationGroupId).
                                                          redcardId(redcard.getUserId()).
                                                          build();

            donationDetailRepository.save(donationDetail);
        }
    }

    public void checkDonateAmount(List<Redcard> redcardList, int count) {
        if (redcardList.size() < count) {
            throw new DonationAmountExceededException();
        }
    }
};

