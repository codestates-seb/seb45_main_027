package com.project.bbibbi.domain.member.controller.dto;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.entity.SocialType;
import lombok.Getter;
import lombok.Setter;

import static com.project.bbibbi.domain.member.entity.QMember.member;
@Getter
@Setter
public class MemberProfile {

    private String username; // 사용자 이름
    private SocialType socialType; // 로그인한 서비스
    private String email; // 사용자의 이메일



    // DTO 파일을 통하여 Entity를 생성하는 메소드
    public Member toEntity() {
        return Member.builder()
                .nickname(this.username)
                .email(this.email)
                .socialType(this.socialType)
                .build();
    }
}
