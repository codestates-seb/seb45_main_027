package com.project.bbibbi.domain.member.service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberUpdatePasswordApiServiceRequest {
    private Long memberId;
    private String password;
    private String newPassword;
}
