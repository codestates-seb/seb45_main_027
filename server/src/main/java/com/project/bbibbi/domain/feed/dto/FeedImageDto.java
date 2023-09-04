package com.project.bbibbi.domain.feed.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedImageDto {
    private String imageUrl;
    private String x;
    private String y;
    private String tag;

}
