package com.project.bbibbi.domain.follow.dto;

import lombok.*;

import java.time.LocalDateTime;

// 회원상세정보에서 Response하는 팔로우 리스트Dto
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FollowListResponseDto {
    private Long fromMemberId;
    private String fromMemberNickname;
    private Long memberId;
    private String memberNickname;
    private String memberImage;
    private String followGubun;
    private LocalDateTime createdDateTime;
}
