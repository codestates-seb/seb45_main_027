package com.project.bbibbi.global.entity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum RoomSize implements BaseEnum {
    SIZE01("1~9평"),
    SIZE02("10평"),
    SIZE03("20평"),
    SIZE04("30평"),
    SIZE05("40평"),
    SIZE06("50평"),
    SIZE07("60평"),
    SIZE08("70평 이상");

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
