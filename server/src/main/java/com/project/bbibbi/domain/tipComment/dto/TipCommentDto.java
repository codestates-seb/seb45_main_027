package com.project.bbibbi.domain.tipComment.dto;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * DTO for {@link com.project.bbibbi.domain.tipComment.entity.TipComment}
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipCommentDto implements Serializable {
    @NotNull
    private String content;

    private Long parentComment;

    private Long tipCommentId;

    private Long memberId;

}