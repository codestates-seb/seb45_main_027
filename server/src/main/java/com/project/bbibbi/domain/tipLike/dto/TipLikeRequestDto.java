package com.project.bbibbi.domain.tipLike.dto;

import com.project.bbibbi.domain.tipLike.entity.TipLike;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO for {@link TipLike}
 */
@Getter
@Setter
@NoArgsConstructor
public class TipLikeRequestDto {
    private Long tipId;
    private Long memberId;
}
