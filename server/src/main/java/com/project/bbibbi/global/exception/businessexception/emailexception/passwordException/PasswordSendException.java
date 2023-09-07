package com.project.bbibbi.global.exception.businessexception.emailexception.passwordException;

import org.springframework.http.HttpStatus;

public class PasswordSendException extends PasswordException {

    public static final String MESSAGE = "새로운 비밀번호를 이메일 전송에 실패했습니다. 다시 시도해주세요.";
    public static final String CODE = "EMAILPASSWORD-400";

    public PasswordSendException() {
        super(CODE, HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
