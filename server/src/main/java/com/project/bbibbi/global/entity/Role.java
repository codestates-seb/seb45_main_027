package com.project.bbibbi.global.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {


        GUEST("ROLE_GUEST"), USER("ROLE_USER"); //user 일반로그인 할 때 post 정보

        private final String key;
    }

