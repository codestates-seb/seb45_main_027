package com.project.bbibbi.auth.oauth;

import com.project.bbibbi.global.entity.BaseEnum;

import java.util.Map;
import java.util.function.Function;

public enum Provider implements BaseEnum {

    NAVER("naver", (attributes) ->
            MemberProfile.builder()
                    .email((String) attributes.get("email"))
                    .build()),


    KAKAO("kakao", (attributes) -> {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");

        return MemberProfile.builder()
                .email((String) kakaoAccount.get("email"))
                .build();
    });


private final String registrationId;
private final Function<Map<String, Object>, MemberProfile> of;

    Provider(String registrationId, Function<Map<String, Object>, MemberProfile> of) {
        this.registrationId = registrationId;
        this.of = of;
    }

    @Override
    public String getName() {
        return name();
    }

    @Override
    public String getDescription() {
        return this.registrationId;
    }
}

