package com.project.bbibbi.global.exception.businessexception.emailexception;

import com.project.bbibbi.global.exception.businessexception.BusinessException;
import org.springframework.http.HttpStatus;

public abstract class EmailException extends BusinessException {

    protected EmailException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }
}
