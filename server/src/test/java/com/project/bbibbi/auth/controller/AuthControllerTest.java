package com.project.bbibbi.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.bbibbi.auth.jwt.LoginDto;
import com.project.bbibbi.domain.member.controller.dto.MemberCreateApiRequest;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.service.MemberService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import javax.persistence.EntityManager;

import static com.project.bbibbi.domain.member.entity.Member.createMember;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.RequestEntity.post;

@WebMvcTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    MemberService memberService;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EntityManager em;

    @Test
    @DisplayName("회원가입을 한다.")
    void signup() {

        String email = "email@test.com";
        String password = "@abcd1234";
        LoginDto loginDto = new LoginDto(email, password + "check!");
        createMember(loginDto.getEmail(), loginDto.getPassword());


        mockMvc.perform(post("/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDto)));

    }

    private Member createMember(String email, String password) {

        Member member = Member.builder()
                .email(email)
                .nickname("nickName")
                .password(passwordEncoder.encode(password))
                .build();

        em.persist(member);

        return member;
    }
}