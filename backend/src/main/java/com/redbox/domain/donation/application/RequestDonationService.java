package com.redbox.domain.donation.application;

import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.donation.entity.DonationGroup;
import com.redbox.domain.donation.entity.DonationType;
import com.redbox.domain.donation.repository.DonationDetailRepository;
import com.redbox.domain.donation.repository.DonationGroupRepository;
import com.redbox.domain.redcard.entity.Redcard;
import com.redbox.domain.redcard.repository.RedcardRepository;
import com.redbox.domain.redcard.service.RedcardService;
import com.redbox.domain.request.application.RequestService;
import com.redbox.domain.request.exception.RequestNotFoundException;
import com.redbox.domain.user.service.UserService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RequestDonationService extends AbstractDonationService {

    private final RequestService requestService;

    public RequestDonationService(UserService userService, RedcardRepository redcardRepository, RedcardService redcardService, DonationGroupRepository donationGroupRepository, DonationDetailRepository donationDetailRepository, RequestService requestService) {
        super(userService, redcardRepository, redcardService, donationGroupRepository, donationDetailRepository);
        this.requestService = requestService;
    }

    @Transactional
    @Override
    public void processDonation(DonationRequest donationRequest) {
        // 게시글에 기부 (대기 상태)
        int donationCount = donationRequest.getQuantity();
        long receiverId = donationRequest.getReceiveId();
        validateReceiver(receiverId);
        long donorId = userService.getCurrentUserId();

        List<Redcard> redcardList = pickDonateRedCardList(donationRequest);
        // 기부 취소가 이루어질 수 있으니 RedCard 소유자는 변경되지 않음 -> 기부 확정 시점에 이전
        redcardService.updateRedCardStatusPending(redcardList); // RedCard 상태만 변경

        DonationGroup requestDonationGroup = createDonationGroup(donorId, receiverId, DonationType.PENDING, donationCount, donationRequest.getComment());
        Long donationGroupId = requestDonationGroup.getId();
        saveDonationDetails(redcardList, donationGroupId);
    }

    @Override
    public void validateDonation(List<Redcard> redcardList, DonationRequest donationRequest) {
    }

    @Override
    protected void validateReceiver(long receiverId) {
        boolean exists = requestService.existsRequestById(receiverId);
        if (!exists) {
            throw new RequestNotFoundException();
        }
    }
}
