//package com.project.bbibbi.domain.feed.entity;
//
//import com.project.bbibbi.global.entity.BaseEntity;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//import java.util.ArrayList;
//import java.util.List;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//public class    FeedImage extends BaseEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long feedImageId;
//
//    @Column(length = 3000)
//    @Lob
//    private String image;
//
//    @ManyToOne
//    @JoinColumn(name = "feed_id")
//    private Feed feed;
//
//    @OneToMany(mappedBy = "feedImage", cascade = CascadeType.REMOVE)
//    private List<FeedImageTag> imageTags = new ArrayList<>();
//
//}
