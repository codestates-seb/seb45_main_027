package com.project.bbibbi.auth.oauth2.presentation;

import com.project.bbibbi.auth.oauth2.domain.OauthServerType;
import org.springframework.core.convert.converter.Converter;

public class OauthServerTypeConverter implements Converter<String, OauthServerType> {

    @Override
    public OauthServerType convert(String source) {
        return OauthServerType.fromName(source);
    }
}
