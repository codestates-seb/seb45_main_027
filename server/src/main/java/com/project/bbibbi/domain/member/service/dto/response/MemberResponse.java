package com.project.bbibbi.domain.member.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberResponse {

    private Long memberId;
    private String email;
    private String nickname;
    private String image;
    private String myIntro;
    // 팔로워수, 팔로워목록, 팔로우수 팔로우목록, 리스트 목록으로 꿀팁과 인테리어를 둘다 모아서 주면 됨(몇개로 반환)
    //자신의 북마크, 자신의 좋아요(게시물만) 댓글 안주고, 좋아요 게시물
}
