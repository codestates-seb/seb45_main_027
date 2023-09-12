package com.project.bbibbi.auth.oauth;

import com.project.bbibbi.auth.jwt.dto.Token;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Provider;

@Service
@Transactional(readOnly = true)
public class OauthService {//삭제 ㄱㄱ

    private final MemberRepository memberRepository;

    public OauthService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }


    public Token login(Provider provider, String code) {
        return null; //createToken(member);
    }
}
