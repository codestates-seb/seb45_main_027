package com.project.bbibbi.domain.member.service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class MemberCreateServiceRequest {

    private String email;
    private String nickname;
    private String password;
}
