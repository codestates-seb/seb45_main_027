package com.project.bbibbi.auth.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.security.Provider;

@AllArgsConstructor
@Getter
@Builder
public class OauthJoinApiRequest {

    @NotNull(message = "OAuth 인증을 선택해주세요.")
    private Provider provider;
    private String code;
}
