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
    private String memberImage;

    private int likeCount;
    private Boolean likeYn;
    private int repliesCount;


    // feedImage와 합쳐보내
    private List<FeedImageDto> feedImages;

    // reply
    private List<FeedReplyResponseDto> replies;


//    좋아요도 만들어야함 좋아요는 갯수로 보여주는거
//
//
//    로그인한 안한 경우 무조건 false 기본값이니까 신경안써도되는데
//    로그인했을 경우 2가지 경우 - 로그인 하고 로그인 한 당사자가 북마크 설정하면 true
//    로그인 한 상태에서드 로그인 한 사용자가 북마크를 설정하지 않았다면 false
//
//    멤버 1 이 로그인함 -> 피드 1 에 북마크 체크 함 -> true
//    나중에 시간이 흘러 홈페이지에 멤버 1이 다시 로그인을 함->
//            멤버 1이 피드1 게시물을 봄 ->
//    피드 1 , 멤버 1 매칭된 데이터가 있기 때문에 이멤버값은 true가 됨
//    멤버1이 피드1 게시물을 나와서 피드2 게시물을 봄 ->
//    북마크 테이블에는 멤버1 과 피드2랑 매칭된 테이블이 없기 때문에 false가됨
//            멤버1 로그아웃을 함
//                    임의의 사용자가 Feed-id1번 게시물을 봄
//    어차피 로그인 안해서 멤버는 false가나옴


    // 답변내용을 여기에다가 넣을건지? 아니면 따로 답변요청을 할건지?
    // 답변 무한스크롤 하려면 여기 넣기 어려움.

}
