package com.redbox.global.oauth.service;

import com.redbox.domain.user.entity.RoleType;
import com.redbox.domain.user.entity.Status;
import com.redbox.domain.user.entity.User;
import com.redbox.domain.user.repository.UserRepository;
import com.redbox.global.oauth.dto.CustomOAuth2User;
import com.redbox.global.oauth.dto.NaverResponse;
import com.redbox.global.oauth.dto.Oauth2Response;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import java.util.Map;

@Service
@AllArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println(oAuth2User.getAuthorities());

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Oauth2Response oAuth2Response = null;

        if (registrationId.equals("naver")) {
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        }
        // 소셜 종류에 따른 분기 처리
//        if (registrationId.equals("google")) {
//        }
            // 소셜에 따른 userName 구분하여 처리할려면 로직 추가
//        String username = oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId();
        // email로 회원 찾기 -> 소셜로그인의 계정에 등록된 email , id가 아님! 바꿀 수 있음...
        // 바뀜에따라 기존 유저가 신규유저가 될 가능성이 있음...
        User existData = userRepository.findByEmail(oAuth2Response.getEmail());

        RoleType role = RoleType.USER;
        // 처음 로그인 -> 회원가입 로직
        if (existData == null) {
            User user = User.builder().
                            email(oAuth2Response.getEmail()).
                            name(oAuth2Response.getName()).
                            roleType(role).
                            status(Status.ACTIVE).
                            build();

            userRepository.save(user);
            System.out.println("[social]신규 가입 성공");
        }
        // DB에 유저가 있다면 (기존 회원)
        // email은 변경될 수 있으므로 (소셜 계정에서 변경 가능하기 때문에...)
        // 업데이트 처리 (지금 구조로는 email을 변동할수 없다 기준이기 때문에 회원 가입이 되거나 변동없이 로그인 되거나..
        if (existData != null) {
//            existData.updateEmail(oAuth2Response.getEmail());
//            userRepository.save(existData);
            System.out.println("[social]기존 유저 로그인");
            role = existData.getRoleType();
            System.out.println("ROLE : " + role);
        }

        return new CustomOAuth2User(oAuth2Response, role);
    }
}
