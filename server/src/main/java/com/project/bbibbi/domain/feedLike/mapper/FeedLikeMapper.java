package com.project.bbibbi.domain.feedlike.mapper;

import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feedlike.dto.FeedLikeRequestDto;
import com.project.bbibbi.domain.feedlike.dto.FeedLikeResponseDto;
import com.project.bbibbi.domain.feedlike.entity.FeedLike;
import com.project.bbibbi.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface FeedLikeMapper {
    default FeedLike feedLikeRequestDtoToFeedLike(FeedLikeRequestDto feedLikeRequestDto){
        if(feedLikeRequestDto == null){
            return null;
        }

        FeedLike feedLike = new FeedLike();

        Feed feed = new Feed();
        feed.setFeedId(feedLikeRequestDto.getFeedId());
        feedLike.setFeed(feed);
        feedLike.setMember(Member.builder().memberId(feedLikeRequestDto.getMemberId()).build());
        feedLike.setCreatedDateTime(LocalDateTime.now());

        return feedLike;

    }

    default FeedLikeResponseDto feedLikeToFeedLikeResponseDto(FeedLike feedLike){
        if(feedLike == null){
            return null;
        }

        FeedLikeResponseDto feedLikeResponseDto = new FeedLikeResponseDto();

        feedLikeResponseDto.setMemberId(feedLike.getMember().getMemberId());
        feedLikeResponseDto.setFeedId(feedLike.getFeed().getFeedId());
        feedLikeResponseDto.setLikeYn(feedLike.getLikeYn());
        feedLikeResponseDto.setLikeCount(feedLike.getLikeCount());

        return feedLikeResponseDto;

    }
}
