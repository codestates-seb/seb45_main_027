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
public class FeedImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feed_image_id;

    @Column(length = 3000)
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
