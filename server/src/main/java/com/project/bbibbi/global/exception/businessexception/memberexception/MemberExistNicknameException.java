package com.project.bbibbi.global.exception.businessexception.memberexception;

import org.springframework.http.HttpStatus;

public class MemberExistNicknameException extends MemberException{

    public static final String MESSAGE = "이미 존재하는 회원의 닉네임입니다.";
    public static final String CODE = "MEMBER-409";

    public MemberExistNicknameException() {
        super(CODE, HttpStatus.CONFLICT, MESSAGE);
    }
}
