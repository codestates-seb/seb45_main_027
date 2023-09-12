package com.project.bbibbi.domain.tip.dto;


import com.project.bbibbi.domain.tipImage.dto.TipImageDto;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * DTO for {@link com.project.bbibbi.domain.tip.entity.Tip}
 */
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TipPostDto {

    @NotBlank
    private String title;

    private String coverPhoto;

    @NotBlank
    private String content;

    private Long memberId;

    private List<TipImageDto> tipImages;

    private List<String> tagContents;

    public List<String> tagContents() {
        return tagContents;
    }
//    private List<TipLike> tipLikes;
//    private List<TipReply> tipReplies;
//    private List<TipBookmark> tipBookmarks;

}