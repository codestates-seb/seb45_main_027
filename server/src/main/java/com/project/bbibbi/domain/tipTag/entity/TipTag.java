package com.project.bbibbi.domain.tipTag.entity;

import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class TipTag extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipTagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tip_id", nullable = false)
    private Tip tip;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    public TipTag(Tip tip, Tag tag) {
        this.tip = tip;
        this.tag = tag;
    }

    // Getter/Setter 메서드
/*
    public Long getTipTagId() {
        return tipTagId;
    }

    public void setTipTagId(Long tipTagId) {
        this.tipTagId = tipTagId;
    }

    public Tip getTip() {
        return tip;
    }

    public void setTip(Tip tip) {
        this.tip = tip;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }
*/
}
