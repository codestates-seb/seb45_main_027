package com.project.bbibbi.domain.feedlike.controller;

import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.feedlike.dto.FeedLikeRequestDto;
import com.project.bbibbi.domain.feedlike.dto.FeedLikeResponseDto;
import com.project.bbibbi.domain.feedlike.entity.FeedLike;
import com.project.bbibbi.domain.feedlike.mapper.FeedLikeMapper;
import com.project.bbibbi.domain.feedlike.service.FeedLikeService;
import com.project.bbibbi.global.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

        //로그인 유저 가져옴
        Long memberId = loginUtils.getLoginId();

        FeedLikeRequestDto requestBody = new FeedLikeRequestDto();

        requestBody.setMemberId(memberId);
        requestBody.setFeedId(feedId);

        FeedLike feedLike = mapper.feedLikeRequestDtoToFeedLike(requestBody);

        FeedLike updatedFeedLike = feedLikeService.settingFeedLike(feedLike);

        FeedLikeResponseDto feedLikeResponseDto = mapper.feedLikeToFeedLikeResponseDto(updatedFeedLike);

        return new ResponseEntity<>(new SingleResponseDto<>(feedLikeResponseDto), HttpStatus.OK);
    }

}
