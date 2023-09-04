package com.project.bbibbi.domain.feed.dto;

import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feedReply.dto.FeedReplyResponseDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedResponseDto {
    private Long feedId;

    private LocalDateTime createdDateTime;

    private LocalDateTime modifiedDateTime;

    private String title;

    private String content;

    private int views;

    private String coverPhoto;

    // enum 생기면 아래 내용처럼 처리
    //private RoomType roomType;

    private String roomType;
    private String roomTypeName;
    private String roomSize;
    private String roomSizeName;
    private String roomCount;
    private String roomCountName;
    private String roomInfo;
    private String roomInfoName;
    private String location;
    private String locationName;

//    public String getRoomType() {
//        return roomType.getType();
//    }

    private Long memberId;
    private String nickname;

    // feedImage와 합쳐보내
    private List<FeedImageDto> feedimages;

    // reply
    private List<FeedReplyResponseDto> replies;


    // 답변내용을 여기에다가 넣을건지? 아니면 따로 답변요청을 할건지?
    // 답변 무한스크롤 하려면 여기 넣기 어려움.

}
