package com.project.bbibbi.global.exception.businessexception.passwordException;

import com.project.bbibbi.global.exception.businessexception.BusinessException;
import org.springframework.http.HttpStatus;

public abstract class PasswordException extends BusinessException {

    protected PasswordException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }
}
