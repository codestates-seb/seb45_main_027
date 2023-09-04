package com.project.bbibbi.domain.feed.entity;

import com.project.bbibbi.global.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class    FeedImage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedImageId;

    @Column(length = 3000)
    @Lob
    private String image;

    @Column
    private Double x;

    @Column
    private Double y;

    @Column(length = 300)
    private String tag;

    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;

}
