package com.project.bbibbi.domain.feedReplyLike.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedReplyLikeRequestDto {
    private Long memberId;
    private Long feedReplyId;

}
