package com.project.bbibbi.domain.tipReply.dto;

import com.project.bbibbi.global.entity.BaseEntity;
import lombok.*;

/**
 * DTO for {@link com.project.bbibbi.domain.tipReply.entity.TipReply}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TipReplyRequestDto {
    private Long tipReplyId;
    private String content;
    private Long tipId;
    private Long memberId;
    private String profileImg;
    private Boolean replyLikeYn;
}