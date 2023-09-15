package com.project.bbibbi.global.exception.tipexception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class TipReplyNotFoundException extends TipException {

    public static final String MESSAGE = "존재하지 않는 댓글입니다.";
    public static final String CODE = "TIP-402";

    public TipReplyNotFoundException() {
        super(CODE, HttpStatus.UNAUTHORIZED, MESSAGE);
    }
}
