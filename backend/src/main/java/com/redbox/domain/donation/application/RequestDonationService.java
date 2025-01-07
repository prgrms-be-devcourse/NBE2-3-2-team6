package com.redbox.domain.donation.application;

import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.donation.entity.DonationDetail;
import com.redbox.domain.donation.entity.DonationGroup;
import com.redbox.domain.donation.entity.DonationStatus;
import com.redbox.domain.donation.entity.DonationType;
import com.redbox.domain.donation.exception.DonationDuplicateException;
import com.redbox.domain.donation.exception.DonationGroupNotFoundException;
import com.redbox.domain.donation.exception.DonationNotSelfException;
import com.redbox.domain.donation.repository.DonationGroupRepository;
import com.redbox.domain.redcard.entity.Redcard;
import com.redbox.domain.redcard.service.RedcardService;
import com.redbox.domain.request.application.RequestService;
import com.redbox.domain.request.entity.Request;
import com.redbox.domain.request.entity.RequestStatus;
import com.redbox.domain.request.exception.RequestNotFoundException;
import com.redbox.domain.request.exception.UnauthorizedAccessException;
import com.redbox.domain.request.repository.RequestRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class RequestDonationService extends AbstractDonationService {

    private final RequestService requestService;
    private final RedcardService redcardService;
    private final RequestRepository requestRepository;
    private final DonationGroupRepository donationGroupRepository;

    public RequestDonationService(DonationServiceDependencies dependencies, RequestService requestService, RequestRepository requestRepository, DonationGroupRepository donationGroupRepository) {
        super(dependencies);
        this.requestService = requestService;
        this.redcardService = dependencies.getRedcardService();
        this.requestRepository = requestRepository;
        this.donationGroupRepository = dependencies.getDonationGroupRepository();
    }

    // 게시글 만료 처리
    @Transactional
    public void updateExpiredRequests() {
        LocalDate today = LocalDate.now();
        List<Request> expiredRequests = requestRepository.findByDonationEndDateBeforeAndProgressNot(today, RequestStatus.EXPIRED);
        for (Request request : expiredRequests) {
            donationConfirm(request.getRequestId(), request.getUserId());
            request.expired();
        }
        requestRepository.saveAll(expiredRequests);
    }

    @Transactional
    public void donationConfirm(long requestId, long receiverId) {
        List<DonationGroup> donationGroups = getDonationGroups(requestId, DonationStatus.PENDING);

        for (DonationGroup donationGroup : donationGroups) {
            donationGroup.donateConfirm();
            List<DonationDetail> donationDetails = getDonationDetails(donationGroup.getId());
            donationRedCardConfirm(donationDetails, receiverId);
        }
    }

    public void donationRedCardConfirm(List<DonationDetail> donationDetails, long receiverId) {
        for (DonationDetail donationDetail : donationDetails) {
            redcardService.updateRedCardUser(donationDetail.getRedcardId(), receiverId);
        }
    }

    @Transactional
    public void donationRedCardCancel(List<DonationDetail> donationDetails) {
        for (DonationDetail donationDetail : donationDetails) {
            redcardService.updateRedCardCancel(donationDetail.getRedcardId());
        }
    }

    // 하위 세 메서드들은 다른 곳으로 분리 고려
    public List<DonationDetail> getDonationDetails(long groupId) {
        return dependencies.getDonationDetailRepository().findByDonationGroupId(groupId);
    }

    public List<DonationGroup> getDonationGroups(long requestId, DonationStatus donationStatus) {
        List<DonationGroup> donationGroups = dependencies.getDonationGroupRepository()
                                                         .findByReceiverIdAndDonationStatus(requestId, donationStatus);

        if (donationGroups == null) {
            throw new DonationGroupNotFoundException();
        }

        return donationGroups;
    }

    public DonationGroup getDonationGroup(long donationGroupId) {

        return dependencies.getDonationGroupRepository()
                           .findById(donationGroupId).orElseThrow(DonationGroupNotFoundException::new);
    }

    @Transactional
    @Override
    public void processDonation(DonationRequest donationRequest) {
        // 게시글에 기부 (대기 상태)
        int donationCount = donationRequest.getQuantity();
        long receiverId = donationRequest.getReceiveId();
        long donorId = dependencies.getCurrentUserId();
        // 게시글이 존재하는지
        validateReceiver(receiverId);
        // 본인에게 기부하는지
        validateSelfDonate(receiverId, donorId);
        // 이미 기부한 적이 있는지
        validateDuplicateDonate(receiverId, donorId);

        List<Redcard> redcardList = pickDonateRedCardList(donationRequest);
        // 기부 취소가 이루어질 수 있으니 RedCard 소유자는 변경되지 않음 -> 기부 확정 시점에 이전
        redcardService.updateRedCardStatusPending(redcardList); // RedCard 상태만 변경

        DonationGroup requestDonationGroup = createDonationGroup(donorId, receiverId, DonationType.TO_REQUEST, DonationStatus.PENDING, donationCount, donationRequest.getComment());
        Long donationGroupId = requestDonationGroup.getId();
        saveDonationDetails(redcardList, donationGroupId);
    }

    public void validateDuplicateDonate(long requestId, long donorId) {
        boolean exists = donationGroupRepository.existsByReceiverIdAndDonorId(requestId, donorId);

        if (exists) {
            throw new DonationDuplicateException();
        }
    }

    @Transactional
    @Override
    public void cancelDonation(long donationId) {
        long userId = dependencies.getCurrentUserId();
        validationCancelUser(userId, donationId);
        DonationGroup donationGroup = getDonationGroup(donationId);
        donationGroup.donateCancel();

        List<DonationDetail> cancelData = getDonationDetails(donationGroup.getId());
        donationRedCardCancel(cancelData);
//        dependencies.getDonationGroupRepository().save(donationGroup);
//        dependencies.getDonationGroupRepository().flush();
    }

    @Override
    public void validateDonation(List<Redcard> redcardList, DonationRequest donationRequest) {
        checkDonateAmount(redcardList, donationRequest.getQuantity());
        //게시글이 존재하는지
        validateReceiver(donationRequest.getReceiveId());
    }

    @Override
    protected void validateReceiver(long receiverId) {
        boolean exists = requestService.existsRequestById(receiverId);
        if (!exists) {
            throw new RequestNotFoundException();
        }
    }

    @Override
    public void validateSelfDonate(long receiverId, long donorId ) {
        Request request = requestRepository.findById(receiverId).orElseThrow(RequestNotFoundException::new);

        if (request.getUserId().equals(donorId)) {
            throw new DonationNotSelfException();
        }
    }

    public void validationCancelUser(long userId, long donationId) {
        DonationGroup donationGroup = getDonationGroup(donationId);
        if (!donationGroup.getDonorId().equals(userId)) {
            throw new UnauthorizedAccessException();
        }
    }

}
