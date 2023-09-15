package com.project.bbibbi.global.entity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum RoomInfo implements BaseEnum{

    INFO01("원룸"),
    INFO02("거실"),
    INFO03("침실"),
    INFO04("주방"),
    INFO05("욕실"),
    INFO06("아이방"),
    INFO07("드레스룸"),
    INFO08("서재&작업실"),
    INFO09("베란다"),
    INFO10("현관"),
    INFO00("기타");



    private final String stepDescription;
    @Override
    public String getName() {
        return name();
    }

    @Override
    public String getDescription() {
        return this.stepDescription;
    }
}
