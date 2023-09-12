package com.project.bbibbi.domain.feed.entity;

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
public class FeedImageTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedImageTagId;

    @Column
    private Double x;

    @Column
    private Double y;

    @Column(length = 300)
    private String tag;

    @ManyToOne
    @JoinColumn(name = "feed_image_id")
    private FeedImage feedImage;
}
