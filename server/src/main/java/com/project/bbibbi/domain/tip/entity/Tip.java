package com.project.bbibbi.domain.tip.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Tip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipId;

    @Column(nullable = false)
    private LocalDateTime createdDateTime = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedDateTime = LocalDateTime.now();

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String coverPhoto;
    
    @Column(nullable = false)
    private String content;

    @Column
    private int views;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;
/*
    @OneToMany(mappedBy = "Tip", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<TipLike> TipLike = new ArrayList<>();
    @OneToMany(mappedBy = "Tip", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<TipImage> TipImage = new ArrayList<>();
    @OneToMany(mappedBy = "Tip", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<TipTag> tipTag = new ArrayList<>();
    @OneToMany(mappedBy = "Tip", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();

    public void addTipLike(TipLike TipLike) {
        tipLikes.add(TipLike);
    }

    public void setLikes() {
        long upVotes = tipLikes.stream()
                .filter(TipLike -> TipLike.getTipLikeStatus() == TipLike.TipLikeStatus.UPVOTE)
                .count();
    }
*/
}
