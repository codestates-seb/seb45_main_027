package com.project.bbibbi.domain.member.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class MemberFindPasswordApiRequest {

    private String email;
    private String password;
    private String newPassword;

}
