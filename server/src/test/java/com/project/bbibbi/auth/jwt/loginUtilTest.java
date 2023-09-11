package com.project.bbibbi.auth.jwt;

import com.project.bbibbi.auth.jwt.service.CustomJwtUserDetails;
import com.project.bbibbi.auth.oauth.oauthUserInfo.CustomOAuth2User;
import com.project.bbibbi.global.entity.Role;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.jupiter.api.Assertions.*;

class loginUtilTest {

//    @Test
//    public void testGetLoginIdForJwtUser() {
//        // Jwt 사용자용 Authentication 객체 생성
//        CustomJwtUserDetails userDetails = new CustomJwtUserDetails(1L, "user@example.com", "par1231c!#", Role.USER);
//        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        Long loginId = loginUtil.getLoginId();
//        assertNotNull(loginId);
//        assertEquals(1L, loginId);
//    }
//
//    @Test
//    public void testGetLoginIdForOAuth2User() {
//        // OAuth2 사용자용 Authentication 객체 생성
//        CustomOAuth2User oauth2User = new CustomOAuth2User(null, null, null, "user@example.com", null, 2L);
//        Authentication authentication = new UsernamePasswordAuthenticationToken(oauth2User, null);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        Long loginId = loginUtil.getLoginId();
//        assertNotNull(loginId);
//        assertEquals(2L, loginId);
//    }
//
//    @Test
//    public void testGetLoginIdForUnauthenticatedUser() {
//        // 인증되지 않은 사용자용 Authentication 객체 생성
//        SecurityContextHolder.clearContext(); // 인증 내용을 지움
//
//        Long loginId = loginUtil.getLoginId();
//        assertNull(loginId);
//    }
}