package com.project.bbibbi.domain.feedComment.dto;

import com.project.bbibbi.domain.feedComment.entity.FeedComment;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class FeedCommentDto {

    private Long feedCommentId;
    private String content;
    private Long memberId;
    private Long feedReplyId;
    private Long parentComment;
    private Long commentOrder;
    private String nickname;
    private Long feedId;
    private LocalDateTime createdDateTime;
    private String memberImage;

    public static FeedCommentDto toDto(FeedComment feedComment) {
        return FeedCommentDto.builder()
                .feedCommentId(feedComment.getFeedCommentId())
                .content(feedComment.getContent())
                .feedReplyId(feedComment.getFeedReply().getFeedReplyId())
                .feedId(feedComment.getFeed().getFeedId())
                .memberId(feedComment.getMember().getMemberId())
                .parentComment(feedComment.getParentComment())
                .nickname(feedComment.getMember().getNickname())
                .memberImage(feedComment.getMember().getProfileImg())
                .createdDateTime(feedComment.getCreatedDateTime())
                .build();
    }
}
