package com.project.bbibbi.domain.tipComment.entity;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipReply.entity.TipReply;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class TipComment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipCommentId;

    @Column(nullable = false)
    private String content;

    @Column
    private Long parentComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tip_reply_id", nullable = false)
    private TipReply tipReply;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    // 이하는 추가된 내용
    @ManyToOne
    @JoinColumn(name = "tip_id")
    private Tip tip;


}
