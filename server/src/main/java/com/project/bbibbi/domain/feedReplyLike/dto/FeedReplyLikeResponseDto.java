package com.project.bbibbi.domain.feedReplyLike.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedReplyLikeResponseDto {
    private Long memberId;
    private Long feedReplyId;
    private Boolean ReplyLikeYn;
    private Integer LikeCount;

}
