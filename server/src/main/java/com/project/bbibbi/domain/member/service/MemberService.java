package com.project.bbibbi.domain.member.service;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import com.project.bbibbi.domain.member.service.dto.request.MemberCreateServiceRequest;
import com.project.bbibbi.global.exception.businessexception.memberexception.MemberDuplicateException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder; // config에서 bean으로 먼저 등록안해서 생긴 문제

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Long signup(MemberCreateServiceRequest request) {

        checkDuplicateMember(request.getEmail()); // 중복 이메일 회원일 경우 예외처리

        Member member = createMember(request);

        return memberRepository.save(member).getMemberId();
    }

    private Member createMember(MemberCreateServiceRequest request) {
        return Member.createMember(
                request.getEmail(),
                request.getNickname(),
                passwordEncoder.encode(request.getPassword())
        );
    }

    private void checkDuplicateMember(String email) {

        Member member = memberRepository.findByEmail(email).orElse(null);

        if (member != null) {
             throw new MemberDuplicateException();
        }
    }


}
