package com.project.bbibbi.auth.oauth;

import com.project.bbibbi.domain.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class OauthService {

    private final MemberRepository memberRepository;

    public OauthService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
}
