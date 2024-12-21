package com.redbox.domain.redcard.service;

import com.redbox.domain.redcard.dto.RegisterRedCardRequest;
import com.redbox.domain.redcard.entity.RedCard;
import com.redbox.domain.redcard.entity.Status;
import com.redbox.domain.user.entity.User;
import com.redbox.domain.user.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedCardService {

    private final UserRepository userRepository;

    public void registerRedCard(RegisterRedCardRequest request){
        //security 구현이 완료되면 다르게 처리할 예정 (에러도 임시용이라서 따로 안만들었습니다)
//        User user = userRepository.findById(request.getUserId())
//                                  .orElseThrow(() -> new RuntimeException("User not found"));
//
        // TODO: Security 를 얼마나 Custom 하는가에 따라 다르게 될 수가 있음 (유저 인증 가져오는 부분) -> 모듈화 하는 방향으로...
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Authentication is missing or invalid");
        }

        User user = (User) authentication.getPrincipal();
        // RedCard 생성
        RedCard redCard = new RedCard(
                user, request.getDonationDate(), request.getCardNumber(), Status.USED);
        // RedCard 등록
        user.registerRedCard(redCard);
    }
}
