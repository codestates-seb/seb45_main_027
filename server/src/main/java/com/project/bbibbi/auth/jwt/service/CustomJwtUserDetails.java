package com.project.bbibbi.auth.jwt.service;

import com.project.bbibbi.global.entity.Role;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Getter
public class CustomJwtUserDetails extends User {

    private final Long memberId;
    private final Role role;



    public CustomJwtUserDetails(Long memberId, String email, String password, Role role) {
        super(email, password, Collections.singleton(new SimpleGrantedAuthority(role.getKey()))); // authorities를 빈 리스트로 초기화했는데 에러나서 ;;
        this.memberId = memberId;
        this.role = role;

    }
}







