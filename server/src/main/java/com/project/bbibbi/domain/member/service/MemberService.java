package com.project.bbibbi.domain.member.service;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import com.project.bbibbi.domain.member.service.dto.request.MemberCreateServiceRequest;
import com.project.bbibbi.domain.member.service.dto.request.MemberUpdatePasswordApiServiceRequest;
import com.project.bbibbi.domain.member.service.dto.request.MemberUpdateServiceRequest;
import com.project.bbibbi.domain.member.service.dto.response.MemberResponse;
import com.project.bbibbi.global.exception.businessexception.memberexception.MemberDuplicateException;
import com.project.bbibbi.global.exception.businessexception.memberexception.MemberNotFoundException;
import com.project.bbibbi.global.exception.businessexception.memberexception.MemberPasswordException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

    public MemberResponse getMember(Long memberId) {

        Optional<Member> memberOptional = memberRepository.findById(memberId);
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new); // if로 null 값 주던지 아니면 다른 인증으로 바꾸자
        return null;
//         return MemberResponse.getMemberResponse(member); // 받을 값들 생각해보자.. 너무 많다
    }

    private Member createMember(MemberCreateServiceRequest request) {
        return Member.createMember(
                request.getEmail(),
                request.getNickname(),
                passwordEncoder.encode(request.getPassword())
        );
    }

    public void updateMember(MemberUpdateServiceRequest request) {
        //Long loginMemberId = SecurityUtil.getCurrentId();
        // 로그인한 멤버인지 확인 후 그 멤버 아이디로 밑에 추가해주기
        //checkAccessAuthority(loginMemberId, request.getMemberId());

        //Member member = verifiyMember(loginMemberId);
        Member member = verifiyMember(request.getMemberId()); // 이것도 로그인 구현하면 로그인된 아이디를 가져옴 위에꺼가 진실

        updateMember(member, request);

    }

    private void updateMember(Member member, MemberUpdateServiceRequest request) {

        member.updateMyInfo(
                request.getNickname(),
                request.getMyIntro(),
                request.getImage());
    }

    public void updatePassword(MemberUpdatePasswordApiServiceRequest request) {

        //Long loginMemberId = SecurityUtil.getCurrentId();
        // 로그인한 멤버인지 확인 후 그 멤버 아이디로 밑에 추가해주기
        //checkAccessAuthority(loginMemberId, request.getMemberId());

        //Member member = verifiyMember(loginMemberId);
        Member member = verifiyMember(request.getMemberId());

        checkPassword(request.getPassword(), member.getPassword());

        member.updatePassword(
                passwordEncoder.encode(request.getNewPassword())
        );
    }

    public void deleteMember(Long memberId) {
        //Long loginMemberId = SecurityUtil.getCurrentId();
        // 로그인한 멤버인지 확인 후 그 멤버 아이디로 밑에 추가해주기
        //checkAccessAuthority(loginMemberId, request.getMemberId());

        Member member = verifiyMember(memberId);

        try {
            memberRepository.deleteById(memberId);
        } catch (EmptyResultDataAccessException ex) {
            throw new MemberNotFoundException();
        }
        // 후에 만약 계정을 삭제하지 않고 unabled로 한다면 member.unabled로 바꾸는 로직만 추가하자 diable로직 추가
    }

    public Page<MemberResponse.MemberFeed> getMemberFeedPageResponse(Long memberId, Integer page, Integer size) {

        Page<MemberFeedData> memberFeedData = memberRepository.findFeedByMemberId(memberId, PageRequest.of(page, size));

        return memberFeedData.map(MemberResponse.MemberFeed::of);
    }

    public Page<MemberResponse.MemberTip> getMemberTipPageResponse(Long memberId, Integer page, Integer size) {

        Page<MemberTipData> memberTipData = memberRepository.findTipByMemberId(memberId, PageRequest.of(page, size));

        return memberTipData.map(MemberResponse.MemberTip::of);
    }

    public Page<MemberResponse.MemberFeedBookmark> getMemberFeedBookmarkPageResponse(Long memberId, Integer page, Integer size) {

        Page<MemberFeedBookmarkData> memberFeedBookmarkData = memberRepository.findFeedBookmarkByMemberId(memberId, PageRequest.of(page, size));

        return memberFeedBookmarkData.map(MemberResponse.MemberFeedBookmark::of);
    }

    public Page<MemberResponse.MemberFeedBookmark> getMemberFeedBookmarkPageResponse(Long memberId, Integer page, Integer size) {

        Page<MemberFeedBookmarkData> memberFeedBookmarkData = memberRepository.findFeedBookmarkByMemberId(memberId, PageRequest.of(page, size));

        return memberFeedBookmarkData.map(MemberResponse.MemberFeedBookmark::of);
    }

    private void checkPassword(String password, String savedPassword) {
        if (!passwordEncoder.matches(password, savedPassword)) {
            throw new MemberPasswordException();
        }
    }



    private void checkDuplicateMember(String email) {

        Member member = memberRepository.findByEmail(email).orElse(null);

        if (member != null) {
            throw new MemberDuplicateException();
        }
    }

    private Member verifiyMember(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(MemberNotFoundException::new);
    }

    private Member verifiyMember(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
        return member;
    }
}
