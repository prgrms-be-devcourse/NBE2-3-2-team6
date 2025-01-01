package com.redbox.domain.redbox.applicaction;

import com.redbox.domain.donation.application.AbstractDonationService;
import com.redbox.domain.donation.dto.DonationRequest;
import com.redbox.domain.donation.entity.DonationDetail;
import com.redbox.domain.donation.entity.DonationGroup;
import com.redbox.domain.donation.entity.DonationType;
import com.redbox.domain.donation.repository.DonationDetailRepository;
import com.redbox.domain.donation.repository.DonationGroupRepository;
import com.redbox.domain.redbox.dto.TotalCountResponse;
import com.redbox.domain.redbox.entity.Redbox;
import com.redbox.domain.redbox.exception.RedboxNotFoundException;
import com.redbox.domain.redbox.repository.RedboxRepository;
import com.redbox.domain.redcard.entity.Redcard;
import com.redbox.domain.redcard.repository.RedcardRepository;
import com.redbox.domain.redcard.service.RedcardService;
import com.redbox.domain.user.service.UserService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

    public TotalCountResponse getTotalCount() {
        Redbox redbox = redboxRepository.findById(1L)
                .orElseThrow(RedboxNotFoundException::new); // RedboxNotFoundException 사용

        return new TotalCountResponse(redbox.getTotalCount());
    }

    public long getReceivedPatientsCount() {
        // "레드박스로부터 받음" 테이블의 행 수를 조회
        return donationGroupRepository.countByDonorId(0L);
    }

    @Override
    @Transactional
    public void processDonation(DonationRequest donationRequest) {
        int donationCount = donationRequest.getAmount();
        long donationUserId = getDonationUserId();

        // Redcard의 userId 가 redbox 소유일 경우 0 으로 고정;
        long receiverId = 0L;
        List<Redcard> redcardList = getUsersRedCardList(donationCount); // 보유 헌혈증에서 기부할 만큼만 가져오기
        // 헌혈증 보유자 수정
        redcardService.updateRedCardList(redcardList, receiverId);
        // 레드박스 기부 기록 생성 & 저장
        DonationGroup redboxDonationGroup = createDonationGroup(donationUserId, receiverId, DonationType.TO_USER, donationCount, donationRequest.getMessage());
        // 레드박스 디테일 생성 & 저장
        Long donationGroupId = redboxDonationGroup.getId();
        saveDonationDetails(redcardList, donationGroupId);
    }
}