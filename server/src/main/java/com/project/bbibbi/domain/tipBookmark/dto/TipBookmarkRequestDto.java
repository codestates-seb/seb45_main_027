package com.project.bbibbi.domain.tipBookmark.dto;

import com.project.bbibbi.domain.tipBookmark.entity.TipBookmark;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO for {@link TipBookmark}
 */
@Getter
@Setter
@NoArgsConstructor
public class TipBookmarkRequestDto {
    private Long tipId;
    private Long memberId;
}
