package com.project.bbibbi.domain.tip.dto;


import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipImage.dto.TipImageDto;
import com.project.bbibbi.domain.tipTag.entity.TipTag;
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
    private String memberImage;

    private LocalDateTime createdDateTime;
    private LocalDateTime modifiedDateTime;


//    private List<TipImageDto> tipImages;

    private List<TipTag> tipTags;

    public TipResponseDto(Tip tip) {
        this.tipId = tip.getTipId();
        this.title = tip.getTitle();
        this.coverPhoto = tip.getCoverPhoto();
        this.content = tip.getContent();
        this.views = tip.getViews();
        this.memberId = tip.getMember().getMemberId();
        this.nickname = tip.getMember().getNickname();
        this.createdDateTime = tip.getCreatedDateTime();
        this.modifiedDateTime = tip.getModifiedDateTime();
    }

    public void setTiptags(List<TipTag> tipTags) {
        this.tipTags = tipTags;
    }
//    private List<TipLike> tipLikes;
//    private List<TipReply> tipReplies;
//    private List<TipTag> tipTags;
//    private List<TipBookmark> tipBookmarks;

}