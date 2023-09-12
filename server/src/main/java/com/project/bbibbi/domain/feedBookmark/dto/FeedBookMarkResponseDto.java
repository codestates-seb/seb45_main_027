package com.project.bbibbi.domain.feedBookmark.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedBookMarkResponseDto {
    private Long memberId;
    private Long feedId;
    private Boolean BookMarkYn;
    private Integer BookMarkCount;

}
