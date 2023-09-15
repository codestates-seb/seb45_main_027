package com.project.bbibbi.domain.member.service.dto.response;

import com.project.bbibbi.domain.member.entity.Member;
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
    private String profileImg;
    private String myIntro;

    // 팔로워수, 팔로워목록, 팔로우수 팔로우목록, 리스트 목록으로 꿀팁과 인테리어를 둘다 모아서 주면 됨(몇개로 반환)
    //자신의 북마크, 자신의 좋아요(게시물만) 댓글 안주고, 좋아요 게시물

    //1.나를팔로우한사람의 리스트(팔로워수,memberid)
    //2.내가팔로우한사람의 리스트(팔로잉수,memberid),
    //3. 게시글 총 수 // 받으면 됨
    //4. 내 북마크로 조회(이건 새로운 api 요청)
    //5. 내 좋아요 조회(이것도 새로운 api 요청)

    public static MemberResponse MemberInfoResponse(Member member) {
        return MemberResponse.builder()
                .nickname(member.getNickname())
                .myIntro(member.getMyIntro())
                .profileImg(member.getProfileImg())
                .build();
    }
}
