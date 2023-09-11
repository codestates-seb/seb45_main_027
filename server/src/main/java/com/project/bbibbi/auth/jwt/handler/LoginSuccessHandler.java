package com.project.bbibbi.auth.jwt.handler;

import com.project.bbibbi.auth.jwt.service.CustomJwtUserDetails;
import com.project.bbibbi.auth.jwt.service.JwtService;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    // 로그인 성공 시! 추가작업을 하는 핸들러임

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        //String email = extractUsername(authentication); // 인증 정보에서 Username(email) 추출
        //CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        // 이런식으로 가져와서 반환할 때 같이 반환해야할듯 ?
        CustomJwtUserDetails userDetails = (CustomJwtUserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        Long memberId = userDetails.getMemberId();


        String accessToken = jwtService.createAccessToken(email); // JwtService의 createAccessToken을 사용하여 AccessToken 발급
        String refreshToken = jwtService.createRefreshToken(); // JwtService의 createRefreshToken을 사용하여 RefreshToken 발급

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken, memberId); // 응답 헤더에 AccessToken, RefreshToken 실어서 응답

        memberRepository.findByEmail(email)
                .ifPresent(member -> {
                    member.updateRefreshToken(refreshToken);
                    memberRepository.saveAndFlush(member); // 안된다면 고치자 user
                });
        log.info("로그인에 성공하였습니다. 이메일 : {}", email);
        log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
        log.info("발급된 AccessToken 만료 기간 : {}", accessTokenExpiration);
    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        //Long memberId = userDetails.getmemberId; 이러면 userDetails를 재정의해주는 클래스 만들어야함
        //userDetails에 권한이 꼭 들어가야하네.. 이거 커스텀 해야할텐데 어렵다
        return userDetails.getUsername();
    }


}


