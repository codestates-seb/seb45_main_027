package com.project.bbibbi.domain.feed.controller;

import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.feed.mapper.FeedMapper;
import com.project.bbibbi.domain.feed.service.FeedService;
import com.project.bbibbi.domain.feed.dto.*;
import com.project.bbibbi.domain.feed.entity.*;
import com.project.bbibbi.domain.feedReply.dto.FeedReplyResponseDto;
import com.project.bbibbi.global.response.MultiResponseDto;
import com.project.bbibbi.global.response.PageAbleResponseDto;
import com.project.bbibbi.global.response.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.awt.print.Pageable;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/feed")
@Validated
public class FeedController {

    private final static String FEED_DEFAULT_URL = "/feed";

    private final FeedService feedService;

    private final FeedMapper mapper;

    public FeedController(FeedService feedService, FeedMapper mapper) {
        this.feedService = feedService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postFeed(@Valid @RequestBody FeedPostDto requestBody) {

        Feed feed = mapper.feedPostDtoToFeed(requestBody);


        Feed createdFeed = feedService.createFeed(feed);

        URI location = UriComponentsBuilder.newInstance().path(
                FEED_DEFAULT_URL + "/{feed-id}").buildAndExpand(createdFeed.getFeedId()).toUri();

        FeedResponseDto feedResponseDto = mapper.feedToFeedResponseDto(createdFeed);

        return ResponseEntity.created(location).body(new SingleResponseDto<>(feedResponseDto));

    }

    @PatchMapping("/{feed-id}")
    public ResponseEntity patchFeed(@PathVariable("feed-id") @Positive long feedId,
                                    @Valid @RequestBody FeedPatchDto requestBody){
        requestBody.setFeedId(feedId);

        Feed feed = mapper.feedPatchDtoToFeed(requestBody);

        Feed updatedFeed = feedService.updateFeed(feed);

        FeedResponseDto feedResponseDto = mapper.feedToFeedResponseDto(updatedFeed);

        return new ResponseEntity<>(new SingleResponseDto<>(feedResponseDto), HttpStatus.OK);
    }

    @GetMapping("/{feed-id}")
    public ResponseEntity getFeed(@PathVariable("feed-id") @Positive long feedId){
        Feed feed = feedService.findFeed(feedId);

        FeedResponseDto feedResponseDto = mapper.feedToFeedResponseDto(feed);

        return new ResponseEntity<>(new SingleResponseDto<>(feedResponseDto), HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity getFeeds() {
//        List<Feed> feeds = feedService.findFeeds();
//
//        List<FeedResponseDto> feedResponseDtos = mapper.feedsToFeedResponseDtos(feeds);
//
//        return new ResponseEntity<>(new MultiResponseDto<>(feedResponseDtos), HttpStatus.OK);
//
//    }

    @GetMapping("/filter/{search-code}")
    public ResponseEntity getFeeds(@PathVariable("search-code") String searchCode,
                                   @RequestParam int page) {

        // 사이즈는 12로 고정
        int size = 12;

        Page<Feed> pageFeeds = feedService.findFeeds(searchCode, page - 1, size);

        List<Feed> feeds = pageFeeds.getContent();

//        List<Feed> feeds = feedService.findFeeds(searchCode);

        List<FeedResponseDto> feedResponseDtos = mapper.feedsToFeedResponseDtos(feeds);

        PageAbleResponseDto pageAbleResponseDto = new PageAbleResponseDto();
        if(feeds.get(0).getFinalPage()){
            pageAbleResponseDto.setIsLast(true);
        }
        else {
            pageAbleResponseDto.setIsLast(false);
        }

        pageAbleResponseDto.setData(feedResponseDtos);

        return new ResponseEntity<>(pageAbleResponseDto, HttpStatus.OK);

    }

    @GetMapping("/search/{search-string}")
    public ResponseEntity getSearchFeeds(@PathVariable("search-string") String searchString,
                                         @RequestParam int page) {

        // 사이즈는 12로 고정
        int size = 12;

        List<Feed> pageFeeds = feedService.findSearchFeeds(searchString, page - 1, size);

        List<FeedResponseDto> feedResponseDtos = mapper.feedsToFeedResponseDtos(pageFeeds);

        PageAbleResponseDto pageAbleResponseDto = new PageAbleResponseDto();
        if(pageFeeds.get(0).getFinalPage()){
            pageAbleResponseDto.setIsLast(true);
        }
        else {
            pageAbleResponseDto.setIsLast(false);
        }

        pageAbleResponseDto.setData(feedResponseDtos);


        return new ResponseEntity<>(pageAbleResponseDto, HttpStatus.OK);

    }

    @GetMapping("/likeTop10")
    public ResponseEntity getLikeTopTen(){

        List<Feed> pageFeeds = feedService.findLikeTopTen();

        List<FeedResponseDto> feedResponseDtos = mapper.feedsToFeedResponseDtos(pageFeeds);

        return new ResponseEntity<>(new MultiResponseDto<>(feedResponseDtos), HttpStatus.OK);

    }

    @GetMapping("/myInfoSearch")
    public ResponseEntity getMyInfoFeeds() {

        // myInfo 대상 memberId가 1번이라고 가정한다. 로그인 기능 구현되면 아랫줄 대신 로그인대상을 받는 코드를 쓴다.
        Long myInfoMemberId = 1L;

        // 사이즈는 4로 고정
        int size = 4;

        List<Feed> pageFeeds = feedService.findMyInfoFeeds(myInfoMemberId);  // 비쿼리일 경우

//        List<Feed> feeds = feedService.findMyInfoFeeds(page - 1, size, myInfoMemberId); 쿼리방법
        List<FeedResponseDto> feedResponseDtos = mapper.feedsToFeedResponseDtos(pageFeeds);

        return new ResponseEntity<>(new MultiResponseDto<>(feedResponseDtos), HttpStatus.OK);

    }

    @DeleteMapping("/{feed-id}")
    public ResponseEntity deleteFeed(@PathVariable("feed-id") @Positive long feedId){
        feedService.deleteFeed(feedId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
//
//    @GetMapping("/paging")
//    public ResponseEntity<Page<dto>> getFeedList(
//            @RequestParam(value = "idx", defaultValue = "0") long Idx,
//            @RequestParam(value = "search", required = false) String search,
//            @PageableDefault(size = 10, sort = "idx", direction = Sort.Direction.ASC) Pageable pageable) {
//        return ResponseEntity.ok(pagingService.getList(pageable, searchText));
//    }
//    private HttpHeaders getHeaderWithNextPage
//            (final Page<dto> responses, final HttpServletRequest httpServletRequest) {
//
//        HttpHeaders headers = new HttpHeaders();
//
//        //마지막 페이지가 아니라면 = 다음페이지가 존재한다면 header 에 Link 삽입
//        if (!responses.isLast()) {
//            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//
//            params.add(idx", responses.getContent().get(
//                    responses.getNumberOfElements() - 1).getIdx().toString());
//            params.add("search", httpServletRequest.getParameter("search"));
//
//            String nextPageUri = ServletUriComponentsBuilder.fromRequestUri(httpServletRequest)
//                    .replaceQueryParams(params)
//                    .build()
//                    .encode()
//                    .toUriString();
//
//            headers.add("Next-Page", nextPageUri);
//        }
//
//        return headers;
//    }




}
