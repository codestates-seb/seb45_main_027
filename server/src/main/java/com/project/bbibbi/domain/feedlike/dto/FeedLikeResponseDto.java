package com.project.bbibbi.domain.feedlike.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedLikeResponseDto {
    private Long memberId;
    private Long feedId;
    private Boolean LikeYn;
    private Integer LikeCount;

}
