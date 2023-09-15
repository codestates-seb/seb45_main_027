package com.project.bbibbi.global.exception.tipexception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class TipCommentNotFoundException extends TipException {

    public static final String MESSAGE = "존재하지 않는 답글입니다.";
    public static final String CODE = "TIP-403";

    public TipCommentNotFoundException(String message) {
        super(CODE, HttpStatus.UNAUTHORIZED, message);
    }
}
