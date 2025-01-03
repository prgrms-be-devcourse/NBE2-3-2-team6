package com.redbox.domain.donation.application;

import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.donation.dto.Top5DonorResponse;
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
        int donationCount = donationRequest.getQuantity();
        long receiverId = donationRequest.getUserId();
        validateReceiver(receiverId);
        long donorId = userService.getCurrentUserId();

        List<Redcard> redcardList = pickDonateRedCardList(donationRequest);
        redcardService.updateRedCardList(redcardList, receiverId);
        DonationGroup userDonationGroup = createDonationGroup(donorId, receiverId, DonationType.USER, donationCount, donationRequest.getComment());
        Long donationGroupId = userDonationGroup.getId();
        saveDonationDetails(redcardList, donationGroupId);
    }

    @Override
    public void validateDonation(List<Redcard> redcardList, DonationRequest donationRequest) {
        checkDonateAmount(redcardList, donationRequest.getQuantity());
        validateReceiver(donationRequest.getUserId());
    }

    @Override
    protected void validateReceiver(long receiverId) {
        boolean exists = userRepository.existsById(receiverId);
        if (!exists) {
            throw new UserNotFoundException();
        }
    }

    public List<Top5DonorResponse> getTop5Donor() {
        return donationGroupRepository.findTop5DonorsOfTheMonth();
    }

}
