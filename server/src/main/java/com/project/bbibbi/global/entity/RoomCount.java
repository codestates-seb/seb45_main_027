package com.project.bbibbi.global.entity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum RoomCount implements BaseEnum {

    COUNT01("1개"),
    COUNT02("2개"),
    COUNT03("3개"),
    COUNT04("4개"),
    COUNT05("5개 이상");



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
