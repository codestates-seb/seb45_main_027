package com.project.bbibbi.domain.tipLike.entity;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TipLike extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipLikeId;

    @ManyToOne
    @JoinColumn(name = "tip_id")
    private Tip tip;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Transient
    private Boolean likeYn;

    @Transient
    private Integer likeCount;

}
