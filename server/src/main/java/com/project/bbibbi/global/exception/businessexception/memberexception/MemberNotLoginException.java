package com.project.bbibbi.global.exception.businessexception.memberexception;

import org.springframework.http.HttpStatus;

public class MemberNotLoginException extends MemberException{

    public static final String MESSAGE = "토큰 값 안 넣은 것 같아요~~~~";
    public static final String CODE = "MEMBER-500";

    public MemberNotLoginException() {
        super(CODE, HttpStatus.FORBIDDEN, MESSAGE);
    }
}

