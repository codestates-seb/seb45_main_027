package com.project.bbibbi.domain.member.service;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import com.project.bbibbi.domain.member.service.dto.request.MemberCreateServiceRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    private Member createMember(MemberCreateServiceRequest request) {
        return Member.createMember(
                request.getEmail(),
                request.getNickname(),
                request.getPassword() // 이 값 패스워드 엔코더된 값으로 가져와야함
        );
    }


}
