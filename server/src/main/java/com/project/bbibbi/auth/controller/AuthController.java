package com.project.bbibbi.auth.controller;


import com.project.bbibbi.auth.controller.dto.OauthJoinApiRequest;
import com.project.bbibbi.auth.jwt.dto.Token;
import com.project.bbibbi.auth.oauth.OauthService;
import com.project.bbibbi.domain.member.controller.dto.MemberCreateApiRequest;
import com.project.bbibbi.domain.member.controller.dto.MemberFindPasswordApiRequest;
import com.project.bbibbi.domain.member.service.MemberService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

import static org.springframework.security.oauth2.core.OAuth2AccessToken.TokenType.BEARER;


//import static com.project.bbibbi.auth.utils.AuthBasic.BEARER;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final MemberService memberService;
    private final OauthService oauthService;

    public AuthController(MemberService memberService, OauthService oauthService) {
        this.memberService = memberService;
        this.oauthService = oauthService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody @Valid MemberCreateApiRequest request) {

        Long memberId = memberService.signup(request.toCreateServiceRequest());


        URI uri = URI.create("/members" + memberId);

        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/oauth") // 오어스 로그인
    public ResponseEntity<String> login(@ModelAttribute @Valid OauthJoinApiRequest request) {
        Token token = oauthService.login(request.getProvider(), request.getCode());

        HttpHeaders tokenHeader = getHttpHeaders(token);

        String jsonResponse = "{\"memberId\":" + token.getMemberId() + "}";

        return ResponseEntity.ok().headers(tokenHeader).body(jsonResponse);
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
    @GetMapping("/oauth/code/naver")
    public String naverTest() {
        return "네이버 코드 완료";}

        @GetMapping("/oauth/code/kakao")
        public String cacaoTest() {
            return "카카오 코드 완료";}




    private HttpHeaders getHttpHeaders(Token token) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.put("Authorization", List.of(BEARER + token.getAccessToken()));
        map.put("Refresh", List.of(BEARER + token.getRefreshToken()));
        HttpHeaders tokenHeader = new HttpHeaders(map);
        return tokenHeader;}

    @PatchMapping("/password")
    private ResponseEntity<Void> findPassword(@RequestBody @Valid MemberFindPasswordApiRequest request) {
        return null;

        //자기 이메일로 보내고 ok, 컨펌 다시 내 아이디창으로 보내야하는데 내 역량에서 가능한가 ?




    }
    // 로그인 창에서 이메일 찾기 이메일 닉네임 패스워드
}
