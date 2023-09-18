package com.project.bbibbi.auth.oauth2.infra;

import com.project.bbibbi.auth.oauth2.domain.AuthCodeRequestUrlProvider;
import com.project.bbibbi.auth.oauth2.domain.OauthServerType;
import org.springframework.web.util.UriComponentsBuilder;

public class KakaoAuthCodeRequestUrlProvider implements AuthCodeRequestUrlProvider {


    @Override
    public OauthServerType supportServer() {
        return OauthServerType.KAKAO;
    }

    @Override
    public String provide() {
        return UriComponentsBuilder
                .fromUriString("https://kauth.kakao.com/oauth/authorize")
                .queryParam("response_type", "code")
                .queryParam("client_id", "1d39dcddb137cd2f16d86df13e791db0")
                .queryParam("redirect_uri", "http://localhost:3000/oauth/redirected/kakao")
                .queryParam("scope", String.join(",", "profile_nickname, profile_image"))
                .toUriString();
    }
}
