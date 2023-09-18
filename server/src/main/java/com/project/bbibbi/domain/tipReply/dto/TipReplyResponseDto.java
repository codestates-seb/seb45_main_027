package com.project.bbibbi.domain.tipReply.dto;

import com.project.bbibbi.domain.tipComment.dto.TipCommentDto;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for {@link com.project.bbibbi.domain.tipReply.entity.TipReply}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TipReplyResponseDto {
    private Long tipReplyId;
    private String content;
    private String nickname;
    private Long tipId;
    private Long memberId;
    private LocalDateTime createdDateTime;
    private LocalDateTime modifiedDateTime;
    private List<TipCommentDto> comments;
    private String memberImage;
    private Boolean replyLikeYn;
}