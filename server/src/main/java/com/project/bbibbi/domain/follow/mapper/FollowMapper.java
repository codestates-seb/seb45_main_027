package com.project.bbibbi.domain.follow.mapper;

import com.project.bbibbi.domain.follow.dto.FollowListResponseDto;
import com.project.bbibbi.domain.follow.dto.FollowResponseDto;
import com.project.bbibbi.domain.follow.entity.Follow;
import com.project.bbibbi.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface FollowMapper {

    default FollowResponseDto followToFollowResponseDto(Follow follow){
        if(follow == null) return null;

        FollowResponseDto followResponseDto = new FollowResponseDto();

        followResponseDto.setFromMemberId(Member.builder().memberId(follow.getFromMember().getMemberId()).build().getMemberId());
        followResponseDto.setMemberId(Member.builder().memberId(follow.getMember().getMemberId()).build().getMemberId());
        followResponseDto.setFollowYn(follow.getFollowYn());

        return followResponseDto;
    }

    default FollowListResponseDto followToFollowListResponseDto(Follow follow){
        if(follow == null) return null;

        FollowListResponseDto followListResponseDto = new FollowListResponseDto();

        followListResponseDto.setFromMemberId(Member.builder().memberId(follow.getFromMember().getMemberId()).build().getMemberId());
        followListResponseDto.setFromMemberNickname
                (Member.builder()
                        .nickname(follow.getFromMember().getNickname()).build().getNickname());
        followListResponseDto.setFromMemberImage(
                Member.builder().profileImg(follow.getFromMember().getProfileImg()).build().getProfileImg());
        followListResponseDto.setMemberId(Member.builder().memberId(follow.getMember().getMemberId()).build().getMemberId());
        followListResponseDto.setMemberNickname(
                Member.builder()
                        .nickname(follow.getMember().getNickname()).build().getNickname());
        followListResponseDto.setMemberImage(
                Member.builder().profileImg(follow.getMember().getProfileImg()).build().getProfileImg());
        followListResponseDto.setCreatedDateTime(follow.getCreatedDateTime());
        followListResponseDto.setFollowYn(follow.getFollowYn());

        return followListResponseDto;

    }

    default List<FollowListResponseDto> followsToFollowListResponseDtos(List<Follow> follows){

        List<FollowListResponseDto> followListResponseDtos =
                follows.stream()
                        .map(follow -> FollowListResponseDto
                                .builder()
                                .fromMemberId(follow.getFromMember().getMemberId())
                                .fromMemberNickname(follow.getFromMember().getNickname())
                                .fromMemberImage(follow.getFromMember().getProfileImg())
                                .memberId(follow.getMember().getMemberId())
                                .memberNickname(follow.getMember().getNickname())
                                .memberImage(follow.getMember().getProfileImg())
                                .followYn(follow.getFollowYn())
                                .createdDateTime(follow.getCreatedDateTime())
                                .build())
                        .collect(Collectors.toList());

        return followListResponseDtos;
    }
}
