package com.project.bbibbi.auth.oauth2.domain;

public interface AuthCodeRequestUrlProvider {

    OauthServerType supportServer();

    String provide();
}
