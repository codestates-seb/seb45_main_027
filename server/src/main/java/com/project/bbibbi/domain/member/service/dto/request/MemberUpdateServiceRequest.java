package com.project.bbibbi.domain.member.service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class MemberUpdateServiceRequest {

    private Long memberId;
    private String nickname;
    private String myIntro;
    private String image;
}
