package com.project.bbibbi.global.exception.businessexception.memberexception;

import org.springframework.http.HttpStatus;

public class NicknameDuplicateException extends MemberException{

    public static final String MESSAGE = "이미 존재하는 닉네임입니다.";
    public static final String CODE = "ninkname-409";

    public NicknameDuplicateException() {
        super(CODE, HttpStatus.CONFLICT, MESSAGE);
    }
}
