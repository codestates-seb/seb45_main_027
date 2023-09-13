package com.project.bbibbi.domain.feedComment.entity;

import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feedReply.entity.FeedReply;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;


@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FeedComment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedCommentId;

    @Column
    private String content;

    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @ManyToOne
    @JoinColumn(name = "feed_reply_id")
    private FeedReply feedReply;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column
    private Long parentComment; // 부모댓글

    //entity 클래스에 있는건 추가하면 컬럼으로 바뀌는데 이걸 사용하면 컬럼으로 생성되지 않음
    @Transient
    private String nickname;

}
