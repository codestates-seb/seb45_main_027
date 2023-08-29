package com.project.bbibbi.global.exception.businessexception.memberexception;

import com.project.bbibbi.global.exception.businessexception.BusinessException;
import org.springframework.http.HttpStatus;

public abstract class MemberException extends BusinessException {

    protected MemberException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }
}
