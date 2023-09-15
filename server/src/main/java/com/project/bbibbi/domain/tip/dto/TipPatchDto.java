package com.project.bbibbi.domain.tip.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * DTO for {@link com.project.bbibbi.domain.tip.entity.Tip}
 */
@Data
@Getter
@Setter
@NoArgsConstructor
public class TipPatchDto {
    private Long tipId;

    @NotBlank
    private String title;

    private String coverPhoto;

    @NotBlank
    private String content;

    private Long memberId;

//    private List<TipImageDto> tipImages;

    private List<String> tagContents;

    public List<String> tagContents() {
        return tagContents;
    }
//    private List<TipLike> tipLikes;
//    private List<TipReply> tipReplies;
//    private List<TipTag> tipTags;
//    private List<TipBookmark> tipBookmarks;

}