package com.project.bbibbi.domain.feed.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Feed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedId;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 3000, nullable = false)
    private String content;

    @Column
    private Integer views = 0;

    @Column(length = 3000)
    private String coverPhoto;

    // enum 확인되면 아래 내용들 이렇게 변환
//    @Enumerated(value = EnumType.STRING)
//    @Column(length = 4, nullable = false)
//    private RoomType roomType;

    @Column(length = 4, nullable = false)
    private String roomType;

    @Column(length = 4, nullable = false)
    private String roomSize;

    @Column(length = 4, nullable = false)
    private String roomCount;

    @Column(length = 4, nullable = false)
    private String roomInfo;

    @Column(length = 4, nullable = false)
    private String location;

    // 멤버 확인시 주석 해제
//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;

    @OneToMany(mappedBy = "feed")
    private List<FeedImage> images = new ArrayList<>();



}
