package com.project.bbibbi.auth.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Token { // 삭제 ㄱㄱ

    private String accessToken;
    private String refreshToken;
    private Long memberId;
}
