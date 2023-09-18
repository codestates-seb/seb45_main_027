package com.project.bbibbi.domain.tipBookmark.entity;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TipBookmark extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipBookmarkId;

    @ManyToOne
    @JoinColumn(name = "tip_id")
    private Tip tip;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Transient
    private Boolean bookmarkYn = false;

    @Transient
    private Integer bookmarkCount;
}
