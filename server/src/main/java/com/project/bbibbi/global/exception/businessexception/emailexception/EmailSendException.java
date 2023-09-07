package com.project.bbibbi.global.exception.businessexception.emailexception;

import org.springframework.http.HttpStatus;

public class EmailSendException extends EmailException{

    public static final String MESSAGE = "이메일 전송에 실패했습니다. 다시 시도해주세요.";
    public static final String CODE = "EMAIL-400";

    public EmailSendException() {
        super(CODE, HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
