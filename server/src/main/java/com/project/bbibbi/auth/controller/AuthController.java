package com.project.bbibbi.auth.controller;


import com.project.bbibbi.auth.oauth.OauthService;
import com.project.bbibbi.domain.member.controller.dto.MemberCreateApiRequest;
import com.project.bbibbi.domain.member.controller.dto.MemberFindPasswordApiRequest;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

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

    @PatchMapping("/password")
    private ResponseEntity<Void> findPassword(@RequestBody @Valid MemberFindPasswordApiRequest request) {
        return null;

        //자기 이메일로 보내고 ok, 컨펌 다시 내 아이디창으로 보내야하는데 내 역량에서 가능한가 ?




    }
    // 로그인 창에서 이메일 찾기 이메일 닉네임 패스워드
}
