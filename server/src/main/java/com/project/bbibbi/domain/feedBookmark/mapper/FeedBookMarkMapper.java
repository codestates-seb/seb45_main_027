package com.project.bbibbi.domain.feedBookmark.mapper;

import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feedBookmark.dto.FeedBookMarkRequestDto;
import com.project.bbibbi.domain.feedBookmark.dto.FeedBookMarkResponseDto;
import com.project.bbibbi.domain.feedBookmark.entity.FeedBookMark;
import com.project.bbibbi.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface FeedBookMarkMapper {
    default FeedBookMark feedBookMarkRequestDtoToFeedBookMark(FeedBookMarkRequestDto feedBookMarkRequestDto) {
        if(feedBookMarkRequestDto == null){
            return null;
        }

        FeedBookMark feedBookMark = new FeedBookMark();

        Feed feed = new Feed();
        feed.setFeedId(feedBookMarkRequestDto.getFeedId());
        feedBookMark.setFeed(feed);
        feedBookMark.setMember(Member.builder().memberId(feedBookMarkRequestDto.getMemberId()).build());
        feedBookMark.setCreatedDateTime(LocalDateTime.now());

        return feedBookMark;

    }

    default FeedBookMarkResponseDto feedBookMarkToFeedBookMarkResponseDto(FeedBookMark feedBookMark){
        if(feedBookMark == null){
            return null;
        }

        FeedBookMarkResponseDto feedBookMarkResponseDto = new FeedBookMarkResponseDto();

        feedBookMarkResponseDto.setMemberId(feedBookMark.getMember().getMemberId());
        feedBookMarkResponseDto.setFeedId(feedBookMark.getFeed().getFeedId());
        feedBookMarkResponseDto.setBookMarkYn(feedBookMark.getBookMarkYn());
        feedBookMarkResponseDto.setBookMarkCount(feedBookMark.getBookMarkCount());

        return feedBookMarkResponseDto;

    }
}

