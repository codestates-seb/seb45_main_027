package com.project.bbibbi.global.exception.businessexception.requestexception;

import com.project.bbibbi.global.exception.businessexception.BusinessException;
import org.springframework.http.HttpStatus;

public abstract class  RequestException extends BusinessException {

    protected RequestException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }
}
