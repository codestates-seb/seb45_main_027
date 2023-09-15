package com.project.bbibbi.domain.tipBookmark.dto;

import com.project.bbibbi.domain.tipBookmark.entity.TipBookmark;
import lombok.*;

/**
 * DTO for {@link TipBookmark}
 */
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TipBookmarkResponseDto {
    private Long tipId;
    private Long memberId;
    private Boolean bookmarkYn;
    private Integer bookmarkCount;
}
