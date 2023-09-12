package com.project.bbibbi.domain.feed.entity;

//import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.feedComment.entity.FeedComment;
import com.project.bbibbi.domain.feedReply.entity.FeedReply;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Feed extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedId;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 3000, nullable = false)
    @Lob
    private String content;

    @Column
    private Integer views = 0;

    @Column(length = 3000)
    @Lob
    private String coverPhoto;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private RoomType roomType;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private RoomSize roomSize;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private RoomCount roomCount;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private RoomInfo roomInfo;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Location location;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

//    @Column
//    private Long memberId;

//    @OneToMany(mappedBy = "feed", cascade = CascadeType.REMOVE)
//    private List<FeedImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "feed", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    //게시글 UI에서 댓글을 바로 보여주기 위해 FetchType을 EAGER로 설정,펼쳐보기 같은 UI라면 Lazy로 설정
    @OrderBy("id asc") // OrderBy 어노테이션을 이용하여 간단히 정렬 처리. asc 오름차순 정렬
    private List<FeedReply> replies;

    @Transient
    private int likeCount;

    @Transient
    private Boolean likeYn;

}
