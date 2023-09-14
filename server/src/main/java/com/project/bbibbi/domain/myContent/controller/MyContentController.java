package com.project.bbibbi.domain.myContent.controller;

import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.feed.dto.FeedResponseDto;
import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feed.mapper.FeedMapper;
import com.project.bbibbi.domain.feed.service.FeedService;
import com.project.bbibbi.domain.myContent.dto.MyContentResponseDto;
import com.project.bbibbi.domain.myContent.dto.ShowRoomDto;
import com.project.bbibbi.domain.myContent.dto.TipContentDto;
import com.project.bbibbi.domain.tip.dto.TipResponseDto;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tip.mapper.TipMapper;
import com.project.bbibbi.domain.tip.service.TipService;
import com.project.bbibbi.global.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/myContent")
@Validated
public class MyContentController {

    private final  FeedService feedService;

    private final  TipService tipService;

    private final FeedMapper feedMapper;

    private final TipMapper tipMapper;

    private final static String _DEFAULT_URL = "/myContent";

    public MyContentController(FeedService feedService, TipService tipService,
                                FeedMapper feedMapper, TipMapper tipMapper) {
        this.feedService = feedService;
        this.tipService = tipService;
        this.feedMapper = feedMapper;
        this.tipMapper = tipMapper;
    }

    @GetMapping("/search/{member-id}")
    public ResponseEntity getContents(@PathVariable("member-id") long memberId) {

        // 일단 받아오자 일반 최신순

        // 먼저 post 가져옴
        List<Feed> defaultFeed = feedService.findMyInfoFeeds(memberId);

        List<Tip> defaultTip = tipService.findMyInfoTips(memberId);

        // 좋아요 가져옴
        List<Feed> likeFeed = feedService.findMyInfoFeedsLike(memberId);

        List<Tip> likeTip = tipService.findMyInfoTipsLike(memberId);

        // 북마크 가져옴
        List<Feed> bookMarkFeed = feedService.findMyInfoFeedsBookMark(memberId);

        List<Tip> bookMarkTip = tipService.findMyInfoTipsBookMark(memberId);

        // post를 DTO로 전환
        List<FeedResponseDto> defalutFeedDto = feedMapper.feedsToFeedResponseDtos(defaultFeed);

        List<TipResponseDto> defaultTipDto = defaultTip.stream().map(tipMapper::tipToTipResponseDto).collect(Collectors.toList());

        // 좋아요 DTO 전환
        List<FeedResponseDto> likeFeedDto = feedMapper.feedsToFeedResponseDtos(likeFeed);

        List<TipResponseDto> likeTipDto = likeTip.stream().map(tipMapper::tipToTipResponseDto).collect(Collectors.toList());

        // 북마크 DTO 전환
        List<FeedResponseDto> bookMarkFeedDto = feedMapper.feedsToFeedResponseDtos(bookMarkFeed);

        List<TipResponseDto> bookMarkTipDto = bookMarkTip.stream().map(tipMapper::tipToTipResponseDto).collect(Collectors.toList());

        ShowRoomDto showRoomDto = new ShowRoomDto();
        TipContentDto tipContentDto = new TipContentDto();
        MyContentResponseDto myContentResponseDto = new MyContentResponseDto();

        showRoomDto.setPost(defalutFeedDto);
        showRoomDto.setLike(likeFeedDto);
        showRoomDto.setBookMark(bookMarkFeedDto);
        myContentResponseDto.setShowRoom(showRoomDto);

        tipContentDto.setPost(defaultTipDto);
        tipContentDto.setLike(likeTipDto);
        tipContentDto.setBookMark(bookMarkTipDto);
        myContentResponseDto.setTipContent(tipContentDto);

        return new ResponseEntity<>(new SingleResponseDto<>(myContentResponseDto), HttpStatus.OK);

    }

}
