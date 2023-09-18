package com.project.bbibbi.domain.tipReplyLike.entity;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipReply.entity.TipReply;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class TipReplyLike extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipReplyLikeId;

    @ManyToOne
    @JoinColumn(name = "tip_reply_id")
    private TipReply tipReply;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Transient
    private Boolean replyLikeYn = false;

    @Transient
    private Integer likeCount = 0;
}
