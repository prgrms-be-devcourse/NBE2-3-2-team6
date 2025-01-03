package com.redbox.domain.donation.application;

import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.donation.dto.Top5DonorResponse;
import com.redbox.domain.donation.entity.DonationGroup;
import com.redbox.domain.donation.entity.DonationType;
import com.redbox.domain.donation.exception.DonationAlreadyConfirmedException;
import com.redbox.domain.redcard.entity.Redcard;
import com.redbox.domain.user.exception.UserNotFoundException;
import com.redbox.domain.user.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserDonationService extends AbstractDonationService {

    private final UserRepository userRepository;

    public UserDonationService(DonationServiceDependencies dependencies, UserRepository userRepository) {
        super(dependencies);
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public void processDonation(DonationRequest donationRequest) {
        // user 에게 기부
        int donationCount = donationRequest.getQuantity();
        long receiverId = donationRequest.getReceiveId();
        validateReceiver(receiverId);
        long donorId = dependencies.getCurrentUserId();

        List<Redcard> redcardList = pickDonateRedCardList(donationRequest);
        dependencies.getRedcardService().updateRedCardList(redcardList, receiverId);
        DonationGroup userDonationGroup = createDonationGroup(donorId, receiverId, DonationType.USER, donationCount, donationRequest.getComment());
        Long donationGroupId = userDonationGroup.getId();
        saveDonationDetails(redcardList, donationGroupId);
    }

    @Override
    public void cancelDonation(long receiveId) {
        throw new DonationAlreadyConfirmedException();
    }

    @Override
    public void validateDonation(List<Redcard> redcardList, DonationRequest donationRequest) {
        checkDonateAmount(redcardList, donationRequest.getQuantity());
        validateReceiver(donationRequest.getReceiveId());
    }

    @Override
    protected void validateReceiver(long receiverId) {
        boolean exists = userRepository.existsById(receiverId);
        if (!exists) {
            throw new UserNotFoundException();
        }
    }

    public List<Top5DonorResponse> getTop5Donor() {
        return dependencies.getDonationGroupRepository().findTop5DonorsOfTheMonth();
    }
}
