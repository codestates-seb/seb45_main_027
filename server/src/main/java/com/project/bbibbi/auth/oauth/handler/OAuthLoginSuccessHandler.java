package com.project.bbibbi.auth.oauth.handler;

import com.project.bbibbi.auth.jwt.service.JwtService;
import com.project.bbibbi.auth.oauth.oauthUserInfo.CustomOAuth2User;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import com.project.bbibbi.global.entity.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
//                response.sendRedirect("/"); // 성공 시 메인페이지로 어째뜬 리다이렉트(필요없음 사실)
//                //
//                jwtService.sendAccessAndRefreshToken(response, accessToken, null, memberId);
//
//
//            } else {
//                    loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성 // 다 이부분으로 할 지 고민
//            }
//        } catch (Exception e) {
//            throw e;
//        }

        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            loginSuccess(response, oAuth2User); // 항상 로그인에 성공한 경우 access, refresh 토큰 생성
        } catch (Exception e) {
            throw e;}

    }


    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        Long memberId = oAuth2User.getMemberId();
        String profileImg = oAuth2User.getProfileImg();
        String nickname = oAuth2User.getNickname();

        String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
        String refreshToken = jwtService.createRefreshToken();
        response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
        response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken, memberId, nickname, profileImg);
        jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken);
    }
}
