package com.project.bbibbi.auth.jwt.service;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.Collection;

@Getter
public class CustomJwtUserDetails extends User {
    // 안쓸듯

    private final Long memberId;


    public CustomJwtUserDetails(Long memberId, String email, String password) {
        super(email, password, new ArrayList<>()); // authorities를 빈 리스트로 초기화
        this.memberId = memberId;
    }
}
