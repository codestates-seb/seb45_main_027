package com.project.bbibbi.domain.feedReplyLike.entity;

import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feedReply.entity.FeedReply;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FeedReplyLike extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedReplyLikeId;

    @ManyToOne
    @JoinColumn(name = "feed_reply_id")
    private FeedReply feedReply;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private Boolean replyLikeYn;

    @Transient
    private Integer likeCount;
}
