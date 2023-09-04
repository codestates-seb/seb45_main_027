package com.project.bbibbi.auth.controller.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
public class LoginTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    EntityManager em;

    PasswordEncoder delegatingPasswordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    ObjectMapper objectMapper = new ObjectMapper();

    private static String KEY_USERNAME = "email";
    private static String KEY_PASSWORD = "password";
    private static String USERNAME = "email@naver.com";
    private static String PASSWORD = "asdm1m1234q!";

    private static String LOGIN_RUL = "/auth/oauth";

    private void clear(){
        em.flush();
        em.clear();
    }


    @BeforeEach
    private void init(){
        memberRepository.save(Member.builder()
                .nickname("NickName1")
                .email(USERNAME)
                .password(delegatingPasswordEncoder.encode(PASSWORD))
                .build());
        clear();
    }
    private Map getEmailPasswordMap(String email, String password){
        Map<String, String> map = new HashMap<>();
        map.put(KEY_USERNAME, email);
        map.put(KEY_PASSWORD, password);
        return map;
    }

    private ResultActions perform(String url, MediaType mediaType, Map EmailPasswordMap) throws Exception {
        return mockMvc.perform(MockMvcRequestBuilders
                .post(url)
                .contentType(mediaType)
                .content(objectMapper.writeValueAsString(EmailPasswordMap)));

    }

    @Test
    public void 로그인_성공() throws Exception {
        //given
        Map<String, String> map = getEmailPasswordMap(USERNAME, PASSWORD);


        //when, then
        MvcResult result = perform(LOGIN_RUL, APPLICATION_JSON, map)
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

    }
}
