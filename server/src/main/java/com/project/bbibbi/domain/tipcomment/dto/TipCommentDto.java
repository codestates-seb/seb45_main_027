package com.project.bbibbi.domain.tipcomment.dto;

import lombok.Value;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * DTO for {@link com.project.bbibbi.domain.tipComment.entity.TipComment}
 */
@Value
public class TipCommentDto implements Serializable {
    @NotNull
    String content;
}