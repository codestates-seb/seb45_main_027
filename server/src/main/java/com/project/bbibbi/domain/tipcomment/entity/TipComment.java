package com.project.bbibbi.domain.tipcomment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter

public class TipComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipCommentId;

    @Column(nullable = false)
    private LocalDateTime createdDateTime = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedDateTime = LocalDateTime.now();

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tip_reply_id", nullable = false)
    private TipReply tipReply;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;
}
