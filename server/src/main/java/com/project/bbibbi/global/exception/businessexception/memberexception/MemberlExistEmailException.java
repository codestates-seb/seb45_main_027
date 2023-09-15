package com.project.bbibbi.global.exception.businessexception.memberexception;

import org.springframework.http.HttpStatus;

public class MemberlExistEmailException extends MemberException {

    public static final String MESSAGE = "이미 존재하는 회원의 이메일입니다.";
    public static final String CODE = "member-409";

    public MemberlExistEmailException() {
        super(CODE, HttpStatus.CONFLICT, MESSAGE); //409
    }
}

