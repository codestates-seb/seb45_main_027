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
public class TipReplyResponseDto extends BaseEntity {
    private Long tipReplyId;
    private String content;
    private String nickname;
    private Long tipId;
    private Long memberId;
}