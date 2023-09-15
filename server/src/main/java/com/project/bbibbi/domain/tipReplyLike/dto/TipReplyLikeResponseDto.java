package com.project.bbibbi.domain.tipReplyLike.dto;

import com.project.bbibbi.domain.tipReplyLike.entity.TipReplyLike;
import lombok.*;

/**
 * DTO for {@link TipReplyLike}
 */
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TipReplyLikeResponseDto {
    private Long tipReplyId;
    private Long memberId;
    private Boolean likeYn;
    private Integer likeCount;
}
