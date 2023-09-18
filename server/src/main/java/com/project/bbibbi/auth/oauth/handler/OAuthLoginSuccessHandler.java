package com.project.bbibbi.auth.oauth.handler;

import com.project.bbibbi.auth.jwt.service.JwtService;
import com.project.bbibbi.auth.oauth.oauthUserInfo.CustomOAuth2User;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import com.project.bbibbi.global.entity.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuthLoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");
//        try { // 무조건 다 guest
//            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
//            //Long memberId = oAuth2User.getmemberId;
//
//            // User의 Role이 GUEST일 경우 처음 요청한 회원이므로 회원가입 페이지로 리다이렉트
//            if(oAuth2User.getRole() == Role.GUEST) {
//                String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
//                response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
//                response.sendRedirect("/auth/signup"); // 성공 시 메인페이지로 어째뜬 리다이렉트(필요없음 사실)
//                Long memberId = oAuth2User.getMemberId();
//                String profileImg = oAuth2User.getProfileImg();
//                String nickname = oAuth2User.getNickname();
//                jwtService.sendAccessAndRefreshToken(response, accessToken,null, memberId, nickname, profileImg);
//
//
//            } else {
//                    loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성 // 다 이부분으로 할 지 고민
//            }
//        } catch (Exception e) {
//            throw e;
//        }


            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            loginSuccess(response, oAuth2User); // 항상 로그인에 성공한 경우 access, refresh 토큰 생성


    }


    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        Long memberId = oAuth2User.getMemberId();
        String nickname = oAuth2User.getNickname();
        String profileImg = oAuth2User.getProfileImg();
        Role role = oAuth2User.getRole();

        String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
        String refreshToken = jwtService.createRefreshToken();
        response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
        response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken, memberId, nickname, profileImg, role);
        memberRepository.findByEmail(oAuth2User.getEmail())
                .ifPresent(member -> {
                    member.updateRefreshToken(refreshToken);
                    memberRepository.saveAndFlush(member);

                    log.info("로그인에 성공하였습니다. 이메일 : {}", oAuth2User.getEmail());
                    log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
                    log.info("발급된 AccessToken 만료 기간 : {}", accessTokenExpiration);
                });
//        jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken);
        log.info("오어스 로그인 성공 후 오어스 토큰까지 보내는 중");
    }
}
