package com.project.bbibbi.domain.feedlike.service;

import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feedlike.entity.FeedLike;
import com.project.bbibbi.domain.feedlike.repository.FeedLikeRepository;
import com.project.bbibbi.global.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class FeedLikeService {

    private final FeedLikeRepository feedLikeRepository;

    public FeedLikeService(FeedLikeRepository feedLikeRepository) {
        this.feedLikeRepository = feedLikeRepository;
    }

    public FeedLike settingFeedLike (FeedLike feedLike) {

        Integer existCount = feedLikeRepository.existCount(feedLike.getFeed().getFeedId(), feedLike.getMember().getMemberId());

        if(existCount == 0){
            feedLikeRepository.save(feedLike);
        }
        else {
            feedLikeRepository.deleteByFeedIdAndMemberId(feedLike.getFeed().getFeedId(), feedLike.getMember().getMemberId());
        }

        Integer updatedLikeCount = feedLikeRepository.existCount(feedLike.getFeed().getFeedId(), feedLike.getMember().getMemberId());


        FeedLike updatedFeedLike = new FeedLike();
        updatedFeedLike.setFeed(feedLike.getFeed());
        updatedFeedLike.setMember(feedLike.getMember());

        if(updatedLikeCount == 0){
            updatedFeedLike.setLikeYn(false);
        }
        else {
            updatedFeedLike.setLikeYn(true);
        }

        updatedFeedLike.setLikeCount(feedLikeRepository.feedLikeCount(feedLike.getFeedLikeId()));

        return updatedFeedLike;

    }
}