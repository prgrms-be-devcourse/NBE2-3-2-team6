package com.redbox.domain.redcard.service;

import com.redbox.domain.redcard.dto.RegisterRedCardRequest;
import com.redbox.domain.redcard.entity.RedCard;
import com.redbox.domain.redcard.entity.Status;
import com.redbox.domain.user.entity.User;
import com.redbox.domain.user.repository.UserRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RedCardService {

    private final UserRepository userRepository;

    public void registerRedCard(RegisterRedCardRequest request){
        //TODO  security 구현이 완료되면 contextholder에서 user를 가져올 예정 (에러도 임시용이라서 따로 안만들었습니다)
        User user = userRepository.findById(request.getUserId())
                                  .orElseThrow(() -> new RuntimeException("User not found"));
        // RedCard 생성
        RedCard redCard = new RedCard(
                user, request.getDonationDate(), request.getCardNumber(), Status.USED);
        // RedCard 등록
        user.registerRedCard(redCard);
    }
}
