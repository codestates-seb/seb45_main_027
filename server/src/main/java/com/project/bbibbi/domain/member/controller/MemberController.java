package com.project.bbibbi.domain.member.controller;


import com.project.bbibbi.domain.member.controller.dto.MemberUpdateApiRequest;
import com.project.bbibbi.domain.member.controller.dto.MemberUpdatePasswordApiRequest;
import com.project.bbibbi.domain.member.service.MemberService;
import com.project.bbibbi.domain.member.service.dto.response.MemberResponse;
import com.project.bbibbi.global.response.ApiSingleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;


@RestController
@RequestMapping("/members") // findbyemail로 유저네임 찾아서 memberId 그대로 그대로 리턴
@Validated
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<ApiSingleResponse<MemberResponse>> getMember(@PathVariable("member_id") @Positive Long memberId) {

        MemberResponse memberResponse = memberService.getMember(memberId);
        // db memberId 로그인 하면 토큰안에 암호화된 내용이 있으니까
        return ResponseEntity.ok(ApiSingleResponse.ok(memberResponse));
    }


    @PatchMapping("/{member-id}")
    public ResponseEntity<Void> updateMember(@PathVariable("member-id") @Positive Long memberId,
                                             @RequestBody @Valid MemberUpdateApiRequest request) {

        // 로그인한 유저 인증하는 로직 나중에 추가 ?? 밑에꺼 일단 이거 서비스 단에서 해결해보고 안되면 컨트롤러도 추가
        //Long memberId = SecurityUtil.getCurrentId();  로그인된 멤버 아이디(

        memberService.updateMember(request.toUpdateServiceRequest(memberId));
        // 그러면 파라미터 값에 로그인된 멤버 하나 더 추가해주기) 서비스로직도 수정 ㄱㄱ

        // 이미지 값 어떻게 할 지에 따라 이미지 수정도 따로 추가해야 할듯 일단은 여기 넣어둠


        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{member-id}/password")
    public ResponseEntity<Void> updatePassword(@PathVariable("member-id") @Positive Long memberId,
                                               @RequestBody @Valid MemberUpdatePasswordApiRequest request) {

        //Long loginmemberId = SecurityUtil.getCurrentId();  로그인된 멤버 아이디(
        //  ?? 밑에꺼 일단 이거 서비스 단에서 해결해보고 안되면 컨트롤러도 추가

        memberService.updatePassword(request.toPasswordServiceRequest(memberId));
        // 그러면 파라미터 값에 로그인된 멤버 하나 더 추가해주기) 서비스로직도 수정 ㄱㄱ

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity<Void> deleteMember(@PathVariable("member-id") @Positive Long memberId) {

         memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();
    }
    // 게시글 리스트, 팁 리스트, 좋아요 리스트는 멤버쪽에서 말고 그냥 해달라 요청해라

    // 비밀번호 찾기, 아이디 찾기, 로그인, 이미지 관련 이미지 업로드 이미지 수정 이미지 삭제

}


