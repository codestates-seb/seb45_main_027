package com.project.bbibbi.domain.feed.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
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
    private String roomSize;
    private String roomCount;
    private String roomInfo;
    private String location;

//    public String getRoomType() {
//        return roomType.getType();
//    }

    private Long memberId;
    private String nickname;

    // feedImage와 합쳐보내
    private List<FeedImageDto> feedimages;

    // 답변내용을 여기에다가 넣을건지? 아니면 따로 답변요청을 할건지?
    // 답변 무한스크롤 하려면 여기 넣기 어려움.

}
