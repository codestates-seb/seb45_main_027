package com.project.bbibbi.domain.feed.controller;

import com.project.bbibbi.feed.dto.FeedPostDto;
import com.project.bbibbi.feed.entity.Feed;
import com.project.bbibbi.feed.entity.FeedImage;
import com.project.bbibbi.feed.mapper.FeedMapper;
import com.project.bbibbi.feed.service.FeedService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

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
        FeedImage feedImage = mapper.feedPostDtoToFeedImage(requestBody);

        Feed createdFeed = feedService.createFeed(feed);
        FeedImage createdFeedImage = feedService.createFeedImage(feedImage);

        URI location = UriComponentsBuilder.newInstance().path(FEED_DEFAULT_URL + "/{feed-id}").buildAndExpand(createdFeed.getFeedId()).toUri();

        return ResponseEntity.created(location).build();

    }

}
