package com.project.bbibbi.global.exception.tipexception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class TipNotFoundException extends TipException {

    public static final String MESSAGE = "존재하지 않는 게시글입니다.";
    public static final String CODE = "TIP-401";

    public TipNotFoundException() {
        super(CODE, HttpStatus.UNAUTHORIZED, MESSAGE);
    }
}
