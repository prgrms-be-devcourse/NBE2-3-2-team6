package com.redbox.domain.redbox.applicaction;

import com.redbox.domain.donation.application.AbstractDonationService;
import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.donation.entity.DonationGroup;
import com.redbox.domain.donation.entity.DonationType;
import com.redbox.domain.donation.repository.DonationDetailRepository;
import com.redbox.domain.donation.repository.DonationGroupRepository;
import com.redbox.domain.redbox.dto.RedboxStatsResponse;
import com.redbox.domain.redbox.entity.Redbox;
import com.redbox.domain.redbox.repository.RedboxRepository;
import com.redbox.domain.redcard.entity.Redcard;
import com.redbox.domain.redcard.repository.RedcardRepository;
import com.redbox.domain.redcard.service.RedcardService;
import com.redbox.domain.user.service.UserService;
import com.redbox.domain.redbox.exception.RedboxNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RedboxService extends AbstractDonationService {

    private final RedboxRepository redboxRepository;

    public RedboxService(UserService userService,
                         RedcardRepository redcardRepository,
                         RedboxRepository redboxRepository,
                         RedcardService redcardService, DonationGroupRepository donationGroupRepository, DonationDetailRepository donationDetailRepository) {
        super(userService, redcardRepository, redcardService, donationGroupRepository, donationDetailRepository); // 부모 클래스 생성자 호출
        this.redboxRepository = redboxRepository;
    }

    public RedboxStatsResponse getRedboxStats() {
        // Redbox 테이블의 totalCount 필드에서 누적 개수를 가져옵니다.
        Redbox redbox = redboxRepository.findById(1L)
                .orElseThrow(RedboxNotFoundException::new);

        int totalDonatedCards = redbox.getTotalCount();

        // 도움받은 환자 수를 DonationGroup 테이블에서 계산합니다.
        Integer helpedPatients = donationGroupRepository.getHelpedPatientsCount();
        helpedPatients = (helpedPatients != null) ? helpedPatients : 0;

        return new RedboxStatsResponse(totalDonatedCards, helpedPatients);
    }

    @Override
    @Transactional
    public void processDonation(DonationRequest donationRequest) {
        int donationCount = donationRequest.getAmount();
        long donorId = getDonationUserId();
        long receiverId = 0L;  // redbox 일 경우 0

        List<Redcard> redcardList = pickDonateRedCardList(donationRequest);
        // 헌혈증 보유자 수정
        redcardService.updateRedCardList(redcardList, receiverId);
        // 레드박스 기부 기록 생성 & 저장
        DonationGroup redboxDonationGroup = createDonationGroup(donorId, receiverId, DonationType.TO_USER, donationCount, donationRequest.getMessage());
        // 레드박스 디테일 생성 & 저장
        Long donationGroupId = redboxDonationGroup.getId();
        saveDonationDetails(redcardList, donationGroupId);
    }

    @Override
    public void validateDonation(List<Redcard> redcardList, DonationRequest donationRequest) {
        checkDonateAmount(redcardList, donationRequest.getAmount());
    }
}