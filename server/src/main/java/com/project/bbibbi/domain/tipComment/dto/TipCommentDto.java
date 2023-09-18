package com.project.bbibbi.domain.tipComment.dto;

import com.project.bbibbi.domain.tipComment.entity.TipComment;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.project.bbibbi.domain.tipComment.entity.TipComment}
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipCommentDto {

    private Long tipCommentId;

    private String content;

    private Long parentComment;

    private Long commentOrder;

    private String nickname;

    private Long tipId;

    private Long tipReplyId;

    private Long memberId;

    private LocalDateTime createdDateTime;

    public static TipCommentDto toDto(TipComment tipComment) {
        return TipCommentDto.builder()
                .tipCommentId(tipComment.getTipCommentId())
                .content(tipComment.getContent())
                .tipReplyId(tipComment.getTipReply().getTipReplyId())
                .tipId(tipComment.getTip().getTipId())
                .memberId(tipComment.getMember().getMemberId())
                .parentComment(tipComment.getParentComment())
                .nickname(tipComment.getMember().getNickname())
                .createdDateTime(tipComment.getCreatedDateTime())
                .build();
    }
}