package com.project.bbibbi.domain.tip.dto;


import com.project.bbibbi.domain.tipImage.dto.TipImageDto;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for {@link com.project.bbibbi.domain.tip.entity.Tip}
 */
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TipResponseDto {

    private Long tipId;

    @NotBlank
    private String title;

    @NotBlank
    private String coverPhoto;

    @NotBlank
    private String content;

    private int views;

    private Long memberId;
    private String nickname;

    private LocalDateTime createdDateTime;
    private LocalDateTime modifiedDateTime;


    private List<TipImageDto> tipImages;
//    private List<TipLike> tipLikes;
//    private List<TipReply> tipReplies;
//    private List<TipTag> tipTags;
//    private List<TipBookmark> tipBookmarks;

}