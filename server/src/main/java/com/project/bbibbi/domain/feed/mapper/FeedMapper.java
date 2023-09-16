package com.project.bbibbi.domain.feed.mapper;

import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.feed.dto.*;
import com.project.bbibbi.domain.feed.entity.Feed;
//import com.project.bbibbi.domain.feed.entity.FeedImage;
//import com.project.bbibbi.domain.feed.entity.FeedImageTag;
import com.project.bbibbi.domain.feedComment.dto.FeedCommentDto;
import com.project.bbibbi.domain.feedComment.entity.FeedComment;
import com.project.bbibbi.domain.feedReply.dto.FeedReplyResponseDto;
import com.project.bbibbi.domain.feedReply.entity.FeedReply;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.entity.*;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface FeedMapper {
    default Feed feedPostDtoToFeed(FeedPostDto feedPostDto){
        if(feedPostDto == null){
            return null;
        }

        Feed feed = new Feed();

        feed.setTitle(feedPostDto.getTitle());
        feed.setContent(feedPostDto.getContent());
        feed.setCoverPhoto(feedPostDto.getCoverPhoto());
        feed.setRoomType(RoomType.valueOf(feedPostDto.getRoomType()));
        feed.setRoomSize(RoomSize.valueOf(feedPostDto.getRoomSize()));
        feed.setRoomCount(RoomCount.valueOf(feedPostDto.getRoomCount()));
        feed.setRoomInfo(RoomInfo.valueOf(feedPostDto.getRoomInfo()));
        feed.setLocation(Location.valueOf(feedPostDto.getLocation()));
//        feed.setMemberId(feedPostDto.getMemberId());

        // 이런 멤버값이 들어온다고 가정한다.
        Long memberId = loginUtils.getLoginId();
        feed.setMember(Member.builder().memberId(memberId).nickname("").build());


        // Content에 이미지정보를 텍스트 형태로 저장하므로 image 사용 안함.
//        if(feedPostDto.getFeedImages() != null) {
//
//            List<FeedImage> feedImages = new ArrayList<>();
//
//            for (FeedImageDto feedImageDto : feedPostDto.getFeedImages()) {
//
//                FeedImage tempFeedImage = new FeedImage();
//
//                tempFeedImage.setImage(feedImageDto.getImage());
//                tempFeedImage.setFeed(feed);
//
//                if(feedImageDto.getFeedImageTags() != null){
//
//                    List<FeedImageTag> feedImageTags = new ArrayList<>();
//
//                    for(FeedImageTagDto feedImageTagDto : feedImageDto.getFeedImageTags()){
//                        FeedImageTag tempFeedImageTag = new FeedImageTag();
//
//                        tempFeedImageTag.setFeedImage(tempFeedImage);
//                        tempFeedImageTag.setX(feedImageTagDto.getX());
//                        tempFeedImageTag.setY(feedImageTagDto.getY());
//                        tempFeedImageTag.setTag(feedImageTagDto.getTag());
//
//                        feedImageTags.add(tempFeedImageTag);
//                    }
//
//                    tempFeedImage.setImageTags(feedImageTags);
//                }
//
//                tempFeedImage.setCreatedDateTime(LocalDateTime.now());
//
//                feedImages.add(tempFeedImage);
//
//            }
//
//            feed.setImages(feedImages);
//        }

        feed.setCreatedDateTime(LocalDateTime.now());

        return feed;

    }

    default Feed feedPatchDtoToFeed(FeedPatchDto feedPatchDto){
        if(feedPatchDto == null){
            return null;
        }

        Feed feed = new Feed();

        feed.setFeedId(feedPatchDto.getFeedId());
        feed.setTitle(feedPatchDto.getTitle());
        feed.setContent(feedPatchDto.getContent());
        feed.setCoverPhoto(feedPatchDto.getCoverPhoto());
        feed.setRoomType(RoomType.valueOf(feedPatchDto.getRoomType()));
        feed.setRoomSize(RoomSize.valueOf(feedPatchDto.getRoomSize()));
        feed.setRoomCount(RoomCount.valueOf(feedPatchDto.getRoomCount()));
        feed.setRoomInfo(RoomInfo.valueOf(feedPatchDto.getRoomInfo()));
        feed.setLocation(Location.valueOf(feedPatchDto.getLocation()));
//        feed.setMemberId(feedPatchDto.getMemberId());

        // 이런 멤버값이 들어온다고 가정한다.
        feed.setMember(Member.builder().memberId(1L).nickname("nickname1").build());

        // Content에 이미지정보를 텍스트 형태로 저장하므로 image 사용 안함.
//        if(feedPatchDto.getFeedImages() != null) {
//            List<FeedImage> feedImages = new ArrayList<>();
//
//            for (FeedImageDto feedImageDto : feedPatchDto.getFeedImages()) {
//
//                FeedImage tempFeedImage = new FeedImage();
//
//                tempFeedImage.setFeedImageId(feedImageDto.getFeedImageId());
//                tempFeedImage.setImage(feedImageDto.getImage());
//                tempFeedImage.setFeed(feed);
//
//                if(feedImageDto.getFeedImageTags() != null){
//
//                    List<FeedImageTag> feedImageTags = new ArrayList<>();
//
//                    for(FeedImageTagDto feedImageTagDto : feedImageDto.getFeedImageTags()){
//
//                        FeedImageTag tempFeedImageTag = new FeedImageTag();
//
//                        tempFeedImageTag.setFeedImage(tempFeedImage);
//                        tempFeedImageTag.setX(feedImageTagDto.getX());
//                        tempFeedImageTag.setY(feedImageTagDto.getY());
//                        tempFeedImageTag.setTag(feedImageTagDto.getTag());
//
//                        feedImageTags.add(tempFeedImageTag);
//
//                    }
//
//                    tempFeedImage.setImageTags(feedImageTags);
//
//                }
//
//                tempFeedImage.setCreatedDateTime(LocalDateTime.now());
//                tempFeedImage.setModifiedDateTime(LocalDateTime.now());
//
//                feedImages.add(tempFeedImage);
//
//            }
//
//            feed.setImages(feedImages);
//
//        }
        feed.setModifiedDateTime(LocalDateTime.now());

        return feed;

    }

    default FeedResponseDto feedToFeedResponseDto(Feed feed){
        if(feed == null){
            return null;
        }

        FeedResponseDto feedResponseDto = new FeedResponseDto();
        feedResponseDto.setFeedId(feed.getFeedId());
        feedResponseDto.setCreatedDateTime(feed.getCreatedDateTime());
        feedResponseDto.setModifiedDateTime(feed.getModifiedDateTime());
        feedResponseDto.setTitle(feed.getTitle());
        feedResponseDto.setContent(feed.getContent());
        feedResponseDto.setViews(feed.getViews());
        feedResponseDto.setCoverPhoto(feed.getCoverPhoto());
        feedResponseDto.setRoomType(feed.getRoomType().toString());
        feedResponseDto.setRoomTypeName(feed.getRoomType().getDescription());
        feedResponseDto.setRoomSize(feed.getRoomSize().toString());
        feedResponseDto.setRoomSizeName(feed.getRoomSize().getDescription());
        feedResponseDto.setRoomCount(feed.getRoomCount().toString());
        feedResponseDto.setRoomCountName(feed.getRoomCount().getDescription());
        feedResponseDto.setRoomInfo(feed.getRoomInfo().toString());
        feedResponseDto.setRoomInfoName(feed.getRoomInfo().getDescription());
        feedResponseDto.setLocation(feed.getLocation().toString());
        feedResponseDto.setLocationName(feed.getLocation().getDescription());
        feedResponseDto.setMemberId(feed.getMember().getMemberId());
        feedResponseDto.setNickname(feed.getMember().getNickname());
        feedResponseDto.setMemberImage(feed.getMember().getProfileImg());
        feedResponseDto.setMyIntro(feed.getMember().getMyIntro());
        feedResponseDto.setLikeCount(feed.getLikeCount());
        feedResponseDto.setLikeYn(feed.getLikeYn());
        feedResponseDto.setBookMarkCount(feed.getBookMarkCount());
        feedResponseDto.setBookMarkYn(feed.getBookMarkYn());
        feedResponseDto.setRepliesCount( (feed.getReplies() == null) ? 0: feed.getReplies().size());
        feedResponseDto.setFollowYn(feed.getFollowYn());

        // Content에 이미지정보를 텍스트 형태로 저장하므로 image 사용 안함.
//        if(feed.getImages() != null) {
//            List<FeedImageDto> feedImageDtos = new ArrayList<>();
//
//            for (FeedImage feedImage : feed.getImages()) {
//
//                FeedImageDto feedImageDto = new FeedImageDto();
//
//                feedImageDto.setFeedImageId(feedImage.getFeedImageId());
//                feedImageDto.setImage(feedImage.getImage());
//
//                feedImageDto.setFeedId(feedImage.getFeed().getFeedId());
//
//                if(feedImage.getImageTags() != null){
//                    List<FeedImageTagDto> feedImageTagDtos = new ArrayList<>();
//
//                    for(FeedImageTag feedImageTag : feedImage.getImageTags()){
//
//                        FeedImageTagDto feedImageTagDto = new FeedImageTagDto();
//
//                        feedImageTagDto.setFeedImageTagId(feedImageTag.getFeedImageTagId());
//                        feedImageTagDto.setX(feedImageTag.getX());
//                        feedImageTagDto.setY(feedImageTag.getY());
//                        feedImageTagDto.setTag(feedImageTag.getTag());
//
//                        feedImageTagDtos.add(feedImageTagDto);
//                    }
//
//                    feedImageDto.setFeedImageTags(feedImageTagDtos);
//                }
//
//                feedImageDto.setCreatedDateTime(feedImage.getCreatedDateTime());
//                feedImageDto.setModifiedDateTime(feedImage.getModifiedDateTime());
//
//                feedImageDtos.add(feedImageDto);
//
//            }
//
//            feedResponseDto.setFeedImages(feedImageDtos);
//
//        }

        if(feed.getReplies() != null) {

            List<FeedReplyResponseDto> allReplies = new ArrayList<>();
            //피드에 댓글정보가 있으니 allReplies에 뿌려준다.
            for (FeedReply feedReply : feed.getReplies()) {
                FeedReplyResponseDto feedReplyResponseDto = new FeedReplyResponseDto();
                feedReplyResponseDto.setFeedReplyId(feedReply.getFeedReplyId());
                feedReplyResponseDto.setFeedId(feedReply.getFeed().getFeedId());
                feedReplyResponseDto.setContent(feedReply.getContent());
                feedReplyResponseDto.setNickname(feedReply.getMember().getNickname());
                feedReplyResponseDto.setMemberId(feedReply.getMember().getMemberId());
                feedReplyResponseDto.setCreatedDateTime(feedReply.getCreatedDateTime());
                feedReplyResponseDto.setReplyLikeYn(feedReply.getReplyLikeYn());
                if (feedReply.getComments() != null) {
                    List<FeedCommentDto> allComments = new ArrayList<>(); // FeedCommentDto 타입으로 리스트 생성
                    for (FeedComment feedComment : feedReply.getComments()) {
                        FeedCommentDto commentDto = new FeedCommentDto(); // FeedCommentDto 객체 생성
                        commentDto.setFeedReplyId(feedComment.getFeedCommentId());
                        commentDto.setContent(feedComment.getContent());
                        commentDto.setNickname(feedComment.getMember().getNickname());
                        commentDto.setMemberId(feedComment.getMember().getMemberId());
                        commentDto.setCreatedDateTime(feedComment.getCreatedDateTime());
                        allComments.add(commentDto);
                    }
                    feedReplyResponseDto.setComments(allComments); // FeedReplyResponseDto에 FeedCommentDto 리스트 설정
                }
                allReplies.add(feedReplyResponseDto);
            }
            // Replies 안에 allReplies 저장
            feedResponseDto.setReplies(allReplies);
        }
            return feedResponseDto;
    }

    default List<FeedResponseDto> feedsToFeedResponseDtos(List<Feed> feeds){

        List<FeedResponseDto> feedResponseDtos =
                feeds.stream()
                        .map(feed -> FeedResponseDto
                                .builder()
                                .feedId(feed.getFeedId())
                                .createdDateTime(feed.getCreatedDateTime())
                                .modifiedDateTime(feed.getModifiedDateTime())
                                .title(feed.getTitle())
                                .content(feed.getContent())
                                .views(feed.getViews())
                                .coverPhoto(feed.getCoverPhoto())
                                .roomType(feed.getRoomType().toString())
                                .roomTypeName(feed.getRoomType().getDescription())
                                .roomSize(feed.getRoomSize().toString())
                                .roomSizeName(feed.getRoomSize().getDescription())
                                .roomCount(feed.getRoomCount().toString())
                                .roomCountName(feed.getRoomCount().getDescription())
                                .roomInfo(feed.getRoomInfo().toString())
                                .roomInfoName(feed.getRoomInfo().getDescription())
                                .location(feed.getLocation().toString())
                                .locationName(feed.getLocation().getDescription())
                                .memberId(feed.getMember().getMemberId())
                                .nickname(feed.getMember().getNickname())
                                .memberImage(feed.getMember().getProfileImg())
                                .myIntro(feed.getMember().getMyIntro())
                                .likeCount(feed.getLikeCount())
                                .likeYn(feed.getLikeYn())
                                .bookMarkCount(feed.getBookMarkCount())
                                .bookMarkYn(feed.getLikeYn())
                                .repliesCount((feed.getReplies() == null) ? 0 : feed.getReplies().size())
                                .followYn(feed.getFollowYn())
                                // Content에 이미지정보를 텍스트 형태로 저장하므로 image 사용 안함.
//                                .feedImages(feed.getImages().stream().map(feedImage -> FeedImageDto.builder()
//                                                .feedImageId(feedImage.getFeedImageId())
//                                                .image(feedImage.getImage())
//                                                .feedId(feedImage.getFeed().getFeedId())
//                                                .feedImageTags(feedImage.getImageTags().stream().map(feedImageTag -> FeedImageTagDto.builder()
//                                                                .feedImageTagId(feedImageTag.getFeedImageTagId())
//                                                                .x(feedImageTag.getX())
//                                                                .y(feedImageTag.getY())
//                                                                .tag(feedImageTag.getTag())
//                                                                .build())
//                                                        .collect(Collectors.toList())
//                                                )
//                                                .createdDateTime(feedImage.getCreatedDateTime())
//                                                .modifiedDateTime(feedImage.getModifiedDateTime())
//                                                .build())
//                                        .collect(Collectors.toList()))
                                .build())
                        .collect(Collectors.toList());

        return feedResponseDtos;
    }

}
