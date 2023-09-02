package com.project.bbibbi.auth.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Token {

    private String accessToken;
    private String refreshToken;
    private Long memberId;
}
