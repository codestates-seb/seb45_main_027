package com.project.bbibbi.global.entity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Location implements BaseEnum {

    LOCATION01("서울"),
    LOCATION02("경기"),
    LOCATION03("충청"),
    LOCATION04("전라"),
    LOCATION05("경상"),
    LOCATION06("강원"),
    LOCATION07("제주"),
    LOCATION00("해외");



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

