package com.project.bbibbi.domain.feed.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedImageDto {
    private Long feedImageId;
    private String image;
    private Double x;
    private Double y;
    private String tag;
    private Long feedId;
    private LocalDateTime createdDateTime;
    private LocalDateTime modifiedDateTime;

}
