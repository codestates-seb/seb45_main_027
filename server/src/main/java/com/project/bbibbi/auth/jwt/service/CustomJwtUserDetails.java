package com.project.bbibbi.auth.jwt.service;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
public class CustomJwtUserDetails extends User {

    private final Long memberId;

    public CustomJwtUserDetails(Long memberId, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        super(email, password, authorities);
        this.memberId = memberId;
    }
}
