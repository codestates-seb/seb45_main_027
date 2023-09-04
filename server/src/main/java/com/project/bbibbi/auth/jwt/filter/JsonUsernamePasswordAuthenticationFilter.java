package com.project.bbibbi.auth.jwt.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.StreamUtils;

import javax.security.sasl.AuthenticationException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class JsonUsernamePasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
// 사용 안할지도 ?
    private static final String DEFAULT_LOGIN_REQUEST_URL = "/auth/login";  // /auth/login/ + ????? 로 오는 요청을 처리
    private static final String HTTP_METHOD = "POST"; // 메서드는 post

    private static final String CONTENT_TYPE = "application/json"; //json 타입만 로그인 진행 가능

    private final ObjectMapper objectMapper;

    private static final String USERNAME_KEY="username";
    private static final String PASSWORD_KEY="password";

    private static final AntPathRequestMatcher DEFAULT_LOGIN_PATH_REQUEST_MATCHER =
            new AntPathRequestMatcher(DEFAULT_LOGIN_REQUEST_URL, HTTP_METHOD); // login 요청에, POST로 온 요청에 매칭하기.

    public JsonUsernamePasswordAuthenticationFilter(ObjectMapper objectMapper) {

        super(DEFAULT_LOGIN_PATH_REQUEST_MATCHER);   // 위에서 설정한  /auth/login/* 의 요청에, GET으로 온 요청을 처리하기 위해 설정한다.

        this.objectMapper = objectMapper;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        if(request.getContentType() == null || !request.getContentType().equals(CONTENT_TYPE)  ) {
            throw new AuthenticationServiceException("Authentication Content-Type not supported: " + request.getContentType());
        }

        String messageBody = StreamUtils.copyToString(request.getInputStream(), StandardCharsets.UTF_8);

        Map<String, String> usernamePasswordMap = objectMapper.readValue(messageBody, Map.class);

        String username = usernamePasswordMap.get(USERNAME_KEY);
        String password = usernamePasswordMap.get(PASSWORD_KEY);

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);//principal 과 credentials 전달

        return this.getAuthenticationManager().authenticate(authRequest);

    }
}
