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

    @Transient
    private String nickname;

    @ManyToOne
    @JoinColumn(name = "tip_id")
    private Tip tip;

    @ManyToOne
    @JoinColumn(name = "tip_reply_id")
    private TipReply tipReply;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
