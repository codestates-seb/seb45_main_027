package com.project.bbibbi.domain.follow.controller;

import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.follow.dto.FollowListResponseDto;
import com.project.bbibbi.domain.follow.dto.FollowResponseDto;
import com.project.bbibbi.domain.follow.entity.Follow;
import com.project.bbibbi.domain.follow.mapper.FollowMapper;
import com.project.bbibbi.domain.follow.service.FollowService;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.response.ApiSingleResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/follow")
@Validated
public class FollowController {

    private final FollowService followService;

    private final FollowMapper mapper;

    public FollowController(FollowService followService, FollowMapper mapper) {
        this.followService = followService;
        this.mapper = mapper;
    }

    // from-member-id는 로그인한 사용자라고 가정, member-id는 팔로우 대상자
    // 로그인 이후에는 from-member-id를 받는게 아니라 username으로부터 받도록 수정필요
    @PatchMapping("choose/{from-member-id}/{member-id}")
    public ResponseEntity patchFollow(@PathVariable("from-member-id") Long fromMemberId,
                                      @PathVariable("member-id") Long memberId){

        Follow follow = setMember(fromMemberId, memberId);

        Follow updatedFollow = followService.settingFollow(follow);

        FollowResponseDto followResponseDto = mapper.followToFollowResponseDto(updatedFollow);

        return ResponseEntity.ok(ApiSingleResponse.ok(followResponseDto));
    }

    // 로그인한 사용자가 팔로우한 사람들. member-id는 로그인한 사람이라고 가정
    // 로그인 이후에는 member-id를 받는게 아니라 username으로부터 받도록 수정필요
    @GetMapping("from/{member-id}")
    public ResponseEntity getFromFollow(@PathVariable("member-id") Long memberId){

        List<Follow> follows = followService.findFromFollow(memberId);

        List<FollowListResponseDto> followListResponseDto = mapper.followsToFollowListResponseDtos(follows);

        return ResponseEntity.ok(ApiSingleResponse.ok(followListResponseDto));
    }

    // 로그인한 사용자를 팔로우한 사람들. member-id는 로그인한 사람이라고 가정
    // 로그인 이후에는 member-id를 받는게 아니라 username으로부터 받도록 수정필요
    @GetMapping("to/{member-id}")
    public ResponseEntity getToFollow(@PathVariable("member-id") Long memberId){

        List<Follow> follows = followService.findToFollow(memberId);

        List<FollowListResponseDto> followListResponseDto = mapper.followsToFollowListResponseDtos(follows);

        return ResponseEntity.ok(ApiSingleResponse.ok(followListResponseDto));

    }


    public Follow setMember(Long fromMemberId, Long memberId){

        Follow follow = new Follow();
        follow.setFromMember(Member.builder().memberId(fromMemberId).build());
        follow.setMember(Member.builder().memberId(memberId).build());
        follow.setCreatedDateTime(LocalDateTime.now());

        return follow;
    }
}
