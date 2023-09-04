package com.project.bbibbi.domain.feedReply.dto;

import com.project.bbibbi.global.entity.BaseEntity;
import lombok.*;

import java.time.LocalDateTime;


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
/* Entity -> Dto*/
//    public FeedReplyResponseDto(FeedReplyEntity reply) {
//        this.feedReplyId = reply.getFeedReplyId();
//        this.content = reply.getContent();
//        this.nickname = reply.getMember().getNickname();
//        this.feedId = reply.getFeed().getFeedId();
//}

}
