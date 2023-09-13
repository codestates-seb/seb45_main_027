package com.project.bbibbi.domain.tipReply.dto;

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
}