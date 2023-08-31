package com.project.bbibbi.domain.member.controller.dto;

import com.project.bbibbi.domain.member.service.dto.request.MemberUpdateServiceRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Size;
import java.util.List;
@AllArgsConstructor
@Getter
@Builder
public class MemberUpdateApiRequest {

    @Size(min = 3, max = 15, message = "3 ~ 15 글자 내로 입력해주세요.")
    private String nickname;
    private String myIntro;
    private String image;
    // 이미지 값 들어와야 하나 따로 해야하나

    public MemberUpdateServiceRequest toUpdateServiceRequest(Long memberId) {
        return MemberUpdateServiceRequest.builder()
                .memberId(memberId)
                .nickname(nickname)
                .myIntro(myIntro)
                .image(image)
                .build();
    }
}
