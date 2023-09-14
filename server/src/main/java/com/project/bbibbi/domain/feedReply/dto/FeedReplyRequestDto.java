package com.project.bbibbi.domain.feedReply.dto;


import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.entity.BaseEntity;
import io.jsonwebtoken.lang.Assert;
import lombok.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

// Getter, Setter, equals, hashCode, toString 등의 메서드를 자동으로 생성
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeedReplyRequestDto extends BaseEntity {
    private Long feedReplyId;
    private String content;
    private Long memberId;
    private Long feedId;

    }


    /* Dto -> Entity */
//public FeedReply toEntity()
//{
//    Feed feed = new Feed();
//    feed.setFeedId(feedId);
//    FeedReply reply = FeedReply.builder()
//            .feedReplyId(feedReplyId)
//            .content(content)
//            .member(member)
//            .feed(feed)
//            .build();
//
//    return reply;


