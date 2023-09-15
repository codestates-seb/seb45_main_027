package com.project.bbibbi.global.exception.tipexception;

import com.project.bbibbi.global.exception.businessexception.BusinessException;
import org.springframework.http.HttpStatus;

public abstract class TipException extends BusinessException {

    protected TipException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }
}
