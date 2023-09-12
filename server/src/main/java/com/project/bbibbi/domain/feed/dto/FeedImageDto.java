package com.project.bbibbi.domain.feed.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedImageDto {
    private Long feedImageId;
    private String image;
    private Long feedId;
    private LocalDateTime createdDateTime;
    private LocalDateTime modifiedDateTime;
    private List<FeedImageTagDto> feedImageTags;

}
