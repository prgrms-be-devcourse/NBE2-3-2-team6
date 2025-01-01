package com.redbox.domain.donation.application;

import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.donation.entity.DonationGroup;
import com.redbox.domain.donation.entity.DonationType;
import com.redbox.domain.donation.repository.DonationDetailRepository;
import com.redbox.domain.donation.repository.DonationGroupRepository;
import com.redbox.domain.redcard.entity.Redcard;
import com.redbox.domain.redcard.repository.RedcardRepository;
import com.redbox.domain.redcard.service.RedcardService;
import com.redbox.domain.user.exception.UserNotFoundException;
import com.redbox.domain.user.repository.UserRepository;
import com.redbox.domain.user.service.UserService;
import com.redbox.global.exception.ErrorCode;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserDonationService extends AbstractDonationService {

    private final UserRepository userRepository;

    public UserDonationService(UserService userService, RedcardRepository redcardRepository, RedcardService redcardService, DonationGroupRepository donationGroupRepository, DonationDetailRepository donationDetailRepository, UserRepository userRepository) {
        super(userService, redcardRepository, redcardService, donationGroupRepository, donationDetailRepository);
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public void processDonation(DonationRequest donationRequest) {
        // user 에게 기부
        int donationCount = donationRequest.getAmount();
        long receiverId = donationRequest.getUserId();
        validateReceiver(receiverId);
        long donorId = userService.getCurrentUserId();

        List<Redcard> redcardList = getUsersRedCardList(donationRequest);
        redcardService.updateRedCardList(redcardList, receiverId);
        DonationGroup userDonationGroup = createDonationGroup(donorId, receiverId, DonationType.TO_USER, donationCount, donationRequest.getMessage());
        Long donationGroupId = userDonationGroup.getId();
        saveDonationDetails(redcardList, donationGroupId);
    }

    @Override
    public void validateDonation(List<Redcard> redcardList, DonationRequest donationRequest) {
        checkCount(redcardList, donationRequest.getAmount());
        validateReceiver(donationRequest.getUserId());
    }

    private void validateReceiver(long receiverId) {
        boolean exists = userRepository.existsById(receiverId);
        if (!exists) {
            throw new UserNotFoundException();
        }
    }
}
