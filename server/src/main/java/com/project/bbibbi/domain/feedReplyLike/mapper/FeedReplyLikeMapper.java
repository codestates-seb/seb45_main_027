package com.project.bbibbi.domain.feedReplyLike.mapper;

import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feedReply.entity.FeedReply;
import com.project.bbibbi.domain.feedReplyLike.entity.FeedReplyLike;
import com.project.bbibbi.domain.feedReplyLike.dto.FeedReplyLikeRequestDto;
import com.project.bbibbi.domain.feedReplyLike.dto.FeedReplyLikeResponseDto;
import com.project.bbibbi.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface FeedReplyLikeMapper {
    default FeedReplyLike feedReplyLikeRequestDtoToFeedReplyLike(FeedReplyLikeRequestDto feedReplyLikeRequestDto){
        if(feedReplyLikeRequestDto == null){
            return null;
        }

        FeedReplyLike feedReplyLike = new FeedReplyLike();

        // FeedReply와 Member 엔티티에 대한 참조 설정
        FeedReply feedReply = new FeedReply();

        feedReply.setFeedReplyId(feedReplyLikeRequestDto.getFeedReplyId());
        feedReplyLike.setFeedReply(feedReply);
        feedReplyLike.setMember(Member.builder().memberId(feedReplyLikeRequestDto.getMemberId()).build());
        feedReplyLike.setCreatedDateTime(LocalDateTime.now());


        return feedReplyLike;

    }

    default FeedReplyLikeResponseDto feedReplyLikeToFeedReplyLikeResponseDto(FeedReplyLike feedReplyLike){
        if(feedReplyLike == null){
            return null;
        }

        FeedReplyLikeResponseDto feedReplyLikeResponseDto = new FeedReplyLikeResponseDto();

        feedReplyLikeResponseDto.setMemberId(feedReplyLike.getMember().getMemberId());
        feedReplyLikeResponseDto.setFeedReplyId(feedReplyLike.getFeedReply().getFeedReplyId());
        feedReplyLikeResponseDto.setReplyLikeYn(feedReplyLike.getReplyLikeYn());
        feedReplyLikeResponseDto.setLikeCount(feedReplyLike.getLikeCount());

        return feedReplyLikeResponseDto;
    }
}
