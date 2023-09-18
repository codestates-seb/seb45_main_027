package com.project.bbibbi.auth.controller;

import com.project.bbibbi.auth.controller.dto.AuthEmailCheckApiRequest;
import com.project.bbibbi.auth.controller.dto.AuthEmailSendPasswordApiRequest;
import com.project.bbibbi.auth.controller.dto.OauthJoinApiRequest;
import com.project.bbibbi.auth.controller.dto.AuthEmailSendApiRequest;
import com.project.bbibbi.auth.jwt.dto.Token;
import com.project.bbibbi.auth.oauth2.domain.OauthServerType;
import com.project.bbibbi.auth.oauth2.service.OauthService;
import com.project.bbibbi.domain.member.controller.dto.MemberCreateApiRequest;
import com.project.bbibbi.domain.member.controller.dto.MemberFindPasswordApiRequest;
import com.project.bbibbi.domain.member.service.MemberService;
import com.project.bbibbi.global.response.ApiSingleResponse;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpMethod;

import javax.servlet.http.HttpServletResponse;
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

//    @GetMapping("/oauth") // 오어스 로그인
//    public ResponseEntity<String> login(@ModelAttribute @Valid OauthJoinApiRequest request) {
//        Token token = oauthService.login(request.getProvider(), request.getCode());
//
//        HttpHeaders tokenHeader = getHttpHeaders(token);
//
//        String jsonResponse = "{\"memberId\":" + token.getMemberId() + "}";
//
//        return ResponseEntity.ok().headers(tokenHeader).body(jsonResponse);
//    }

    @SneakyThrows
    @GetMapping("/{oauthServerType}")
    ResponseEntity<Void> redirectAuthCodeRequestUrl(
            @PathVariable OauthServerType oauthServerType,
            HttpServletResponse response
    ) {
        String redirectUrl = oauthService.getAuthCodeRequestUrl(oauthServerType);
        response.sendRedirect(redirectUrl);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
//    @GetMapping("/oauth/code/naver")
//    public String naverTest(String code) {
//        RestTemplate rt = new RestTemplate();
//
//        // HTTP POST를 요청할 때 보내는 데이터(body)를 설명해주는 헤더도 만들어 같이 보내줘야 한다.
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        // body 데이터를 담을 오브젝트인 MultiValueMap를 만들어보자
//        // body는 보통 key, value의 쌍으로 이루어지기 때문에 자바에서 제공해주는 MultiValueMap 타입을 사용한다.
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("grant_type", "authorization_code");
//        params.add("client_id", "9BxZLVQbdFZ0YDig4Gho");
//        params.add("redirect_uri", "http://localhost:8080/auth/oauth/code/naver");
//        params.add("code", code);
//
//
//
//        // 요청하기 위해 헤더(Header)와 데이터(Body)를 합친다.
//        // kakaoTokenRequest는 데이터(Body)와 헤더(Header)를 Entity가 된다.
//        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);
//
//        // POST 방식으로 Http 요청한다. 그리고 response 변수의 응답 받는다.
//        ResponseEntity<String> response = rt.exchange(
//                "https://nid.naver.com/oauth2.0/token", // https://{요청할 서버 주소}
//                HttpMethod.POST, // 요청할 방식
//                kakaoTokenRequest, // 요청할 때 보낼 데이터
//                String.class // 요청 시 반환되는 데이터 타입
//
//        );
//        return "카카오 토큰 요청 완료 : 토큰 요청에 대한 응답 : "+response;
//    }

//
        @GetMapping("/oauth/code/kakao")
        public String kakaoTest() {
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

    }


    @PostMapping("/email")
    public ResponseEntity<Void> sendEmail(@RequestBody @Valid AuthEmailSendApiRequest request) {

        memberService.sendSignupEmail(request.getEmail());

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/email/check")
    public ResponseEntity<ApiSingleResponse<Boolean>> confirmEmail(
            @RequestBody @Valid AuthEmailCheckApiRequest request) {

        boolean result = memberService.checkCode(request.getEmail(), request.getCode());

        return ResponseEntity.ok(ApiSingleResponse.ok(result));
    }

    @PostMapping("/email/password")
    public ResponseEntity<Void> sendEmailForPassword(@RequestBody @Valid AuthEmailSendPasswordApiRequest request) {

        memberService.sendFindPasswordCodeToEmail(request.getEmail());

        return ResponseEntity.noContent().build();
    }
}

