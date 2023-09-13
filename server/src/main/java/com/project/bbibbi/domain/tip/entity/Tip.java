package com.project.bbibbi.domain.tip.entity;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tipReply.entity.TipReply;
import com.project.bbibbi.domain.tipTag.entity.TipTag;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Tip extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String coverPhoto;
    
    @Column(nullable = false)
    private String content;

    @Column
    private Integer views = 0;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

//    @OneToMany(mappedBy = "tip", cascade = {CascadeType.ALL})
//    private List<TipImage> tipImages = new ArrayList<>();

    @OneToMany(mappedBy = "tip", cascade = {CascadeType.ALL})
    private List<TipTag> tipTags = new ArrayList<>();

    @OneToMany(mappedBy = "tip", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @OrderBy("id asc")
    private List<TipReply> replies;

    @Transient
    private int likeCount;

    @Transient
    private Boolean likeYn;

    @Transient
    private int bookmarkCount;

    @Transient
    private Boolean bookmarkYn;

//    @OneToMany(mappedBy = "tip", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<TipLike> tipLikes = new ArrayList<>();
//    @OneToMany(mappedBy = "tip", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<TipReply> tipReplies = new ArrayList<>();
//    @OneToMany(mappedBy = "tip", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<TipBookmark> tipBookmarks = new ArrayList<>();

    @Transient
    private Boolean finalPage = false;

}
