package com.project.bbibbi.domain.feedReply.dto;

import com.project.bbibbi.domain.feedComment.dto.FeedCommentDto;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.*;
import org.springframework.data.domain.Page;

import javax.persistence.Transient;
import java.time.LocalDateTime;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class FeedReplyResponseDto extends BaseEntity {
//여기에 createdtime 을 넣고 dto 다시 변환시켜야한다

    private Long feedReplyId;
    private String content;
    private String nickname;
    private Long feedId;
    private Long memberId;
    private LocalDateTime createdDateTime;
    private List<FeedCommentDto> comments;
    private Member profileImg;
    private Boolean replyLikeYn;
}
