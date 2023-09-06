package com.project.bbibbi.domain.feedlike.controller;

import com.project.bbibbi.domain.feedlike.dto.FeedLikeRequestDto;
import com.project.bbibbi.domain.feedlike.dto.FeedLikeResponseDto;
import com.project.bbibbi.domain.feedlike.entity.FeedLike;
import com.project.bbibbi.domain.feedlike.mapper.FeedLikeMapper;
import com.project.bbibbi.domain.feedlike.service.FeedLikeService;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.response.MultiResponseDto;
import com.project.bbibbi.global.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/feed/{feed-id}/feedlike")
@Validated
public class FeedLikeController {

    private final static String FEED_Like_DEFAULT_URL = "/feedlike";

    private final FeedLikeService feedLikeService;

    private final FeedLikeMapper mapper;

    public FeedLikeController(FeedLikeService feedLikeService, FeedLikeMapper mapper) {
        this.feedLikeService = feedLikeService;
        this.mapper = mapper;
    }

    @PatchMapping
    public ResponseEntity patchFeedLike(@PathVariable("feed-id") Long feedId){

        // 로그인한 사용자의 member_id가 1L 이라고 가정.
        // 로그인 기능 지원시 아래 코드는 삭제하고 현재 로그인한 사용자를 가져오도록 대체

        FeedLikeRequestDto requestBody = new FeedLikeRequestDto();

        requestBody.setMemberId(1L);
        requestBody.setFeedId(feedId);

        FeedLike feedLike = mapper.feedLikeRequestDtoToFeedLike(requestBody);

        FeedLike updatedFeedLike = feedLikeService.settingFeedLike(feedLike);

        FeedLikeResponseDto feedLikeResponseDto = mapper.feedLikeToFeedLikeResponseDto(updatedFeedLike);

        return new ResponseEntity<>(new SingleResponseDto<>(feedLikeResponseDto), HttpStatus.OK);
    }

}
