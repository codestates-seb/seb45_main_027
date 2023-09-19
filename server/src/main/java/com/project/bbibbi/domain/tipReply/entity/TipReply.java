package com.project.bbibbi.domain.tipReply.entity;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipComment.entity.TipComment;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
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
    @Lob
    private String content;

    @ManyToOne
    @JoinColumn(name = "tip_id")
    private Tip tip;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "tipReply", cascade = CascadeType.ALL)
    @OrderBy("id asc")
    private List<TipComment> comments;

    @PrePersist
    protected void onCreate() {
        createdDateTime = LocalDateTime.now();
        modifiedDateTime = LocalDateTime.now();
    }
    @PreUpdate
    protected void onUpdate() {
        modifiedDateTime = LocalDateTime.now();
    }

    @Transient
    private Boolean replyLikeYn;
}
