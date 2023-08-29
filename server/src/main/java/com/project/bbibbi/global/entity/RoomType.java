package com.project.bbibbi.global.entity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum RoomType implements BaseEnum{
    TYPE01("원룸&오피스텔"),
    TYPE02("아파트"),
    TYPE03("빌라&연립"),
    TYPE04("단독주택"),
    TYPE00("기타");




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

