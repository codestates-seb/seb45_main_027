package com.project.bbibbi.auth.jwt.filter;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.project.bbibbi.auth.jwt.service.JwtService;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CustomJwtAuthenticationProcessingFilter //extends JwtAuthenticationProcessingFilter
{

//    public CustomJwtAuthenticationProcessingFilter(JwtService jwtService, MemberRepository memberRepository) {
//        super(jwtService, memberRepository);
//    }
//
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//        try {
//            // Access Token의 유효성을 검사
//            Authentication authentication = super.attemptAuthentication(request, response);
//            return authentication;
//        } catch (TokenExpiredException e) {
//            // Access Token이 만료된 경우
//            // 클라이언트에게 적절한 HTTP 상태 코드와 에러 메시지 반환
//            response.setStatus(HttpStatus.UNAUTHORIZED.value()); // HTTP 401 Unauthorized
//            response.setContentType("application/json");
//            response.getWriter().write("{\"error\": \"access_token_expired\", \"message\": \"Access token has expired.\"}");
//            response.getWriter().flush();
//            response.getWriter().close();
//            return null;
//        }
//    }
}
