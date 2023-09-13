package com.project.bbibbi.domain.tipReply.entity;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipComment.entity.TipComment;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class TipReply extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipReplyId;

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tip_id", nullable = false)
    private Tip tip;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @OneToMany(mappedBy = "tipReply", cascade = CascadeType.ALL)
    @OrderBy("id asc")
    private List<TipComment> comments;
}
