package com.project.bbibbi.domain.feedReply.entity;

import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feedComment.entity.FeedComment;
import com.project.bbibbi.domain.feedComment.service.FeedCommentService;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static javax.persistence.FetchType.LAZY;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class FeedReply extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedReplyId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content; // 댓글 내용

    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "feedReply", cascade = CascadeType.ALL)
    //게시글 UI에서 댓글을 바로 보여주기 위해 FetchType을 EAGER로 설정,펼쳐보기 같은 UI라면 Lazy로 설정
    @OrderBy("id asc")
    private List<FeedComment> comments;
    @PrePersist
    protected void onCreate() {
        createdDateTime = LocalDateTime.now();
        modifiedDateTime = LocalDateTime.now();
    }
    @PreUpdate
    protected void onUpdate() {
        modifiedDateTime = LocalDateTime.now();
    }
}

