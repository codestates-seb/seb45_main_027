package com.project.bbibbi.domain.follow.dto;

import lombok.*;

// 게시글 같은 곳에서 팔로우했을 때 바로 Response 해주는 Dto
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FollowResponseDto {
    private Long fromMemberId;
    private Long memberId;
    private Boolean followYn;

}
