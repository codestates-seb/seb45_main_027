package com.project.bbibbi.domain.member.service;

import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import com.project.bbibbi.domain.member.service.dto.request.MemberCreateServiceRequest;
import com.project.bbibbi.domain.member.service.dto.request.MemberUpdatePasswordApiServiceRequest;
import com.project.bbibbi.domain.member.service.dto.request.MemberUpdateServiceRequest;
import com.project.bbibbi.domain.member.service.dto.response.MemberResponse;
import com.project.bbibbi.global.exception.businessexception.memberexception.*;
import com.project.bbibbi.global.mail.service.MailService;
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

    private final MailService mailService;

    private final PasswordEncoder passwordEncoder; // config에서 bean으로 먼저 등록안해서 생긴 문제

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder,MailService mailService) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
    }

    public Long signup(MemberCreateServiceRequest request) {

        checkDuplicateEmail(request.getEmail());        // 중복 이메일 회원일 경우 예외처리
        checkDuplicateNickname(request.getNickname());  // 중복 닉네임일 경우 예외처리

        Member member = createMember(request);

        return memberRepository.save(member).getMemberId();
    }

    public MemberResponse getMember(Long memberId) {

        Optional<Member> memberOptional = memberRepository.findById(memberId);
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

         return MemberResponse.MemberInfoResponse(member); // 받을 값들 생각해보자.. 너무 많다
    }

    private Member createMember(MemberCreateServiceRequest request) {
        return Member.createMember(
                request.getEmail(),
                request.getNickname(),
                passwordEncoder.encode(request.getPassword())
        );
    }

    public void updateMember(MemberUpdateServiceRequest request) {

        Long loginMemberId = loginUtils.getLoginId();
        if(loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        comparisonMembers(loginMemberId, request.getMemberId());

        Member member = ExistingMember(loginMemberId);

        checkDuplicateNickname(request.getNickname(), member.getNickname());  // 중복 닉네임일 경우 예외처리

        updateMember(member, request);

    }

    private void updateMember(Member member, MemberUpdateServiceRequest request) {

        member.updateMyInfo(
                request.getNickname(),
                request.getMyIntro(),
                request.getProfileImg());
    }

    public void updatePassword(MemberUpdatePasswordApiServiceRequest request) {


        Long loginMemberId = loginUtils.getLoginId();
        if(loginMemberId == null) {
            throw new MemberNotLoginException();
        }

                Optional<Member> optionalMember = memberRepository.findById(request.getMemberId());
                Member member = optionalMember.orElseThrow(MemberNotFoundException::new);


            comparisonMembers(loginMemberId, request.getMemberId());


        //        Member member = verifiyMember(loginMemberId);
        //        Member member = verifiyMember(request.getMemberId());

                checkPassword(request.getPassword(), member.getPassword());

                member.updatePassword(
                        passwordEncoder.encode(request.getNewPassword())
                );
//        Member member = verifiyMember(request.getMemberId());
//
//        checkPassword(request.getPassword(), member.getPassword());
//
//        member.updatePassword(
//                passwordEncoder.encode(request.getNewPassword())
//        );
    }

    public void deleteMember(Long memberId) {


        Long loginMemberId = loginUtils.getLoginId();
        if(loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        comparisonMembers(loginMemberId, memberId);
        Member member = ExistingMember(loginMemberId);


        try {
            memberRepository.deleteById(member.getMemberId());
        } catch (EmptyResultDataAccessException ex) {
            throw new MemberNotFoundException();
        }
        // 후에 만약 계정을 삭제하지 않고 unabled로 한다면 member.unabled로 바꾸는 로직만 추가하자 diable로직 추가
    }


    public void sendSignupEmail(String email) {

        checkcheckExistenceEmail(email);

        String code = mailService.sendLoginEmail(email);

    }

    public boolean checkCode(String email, String code) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            String storedCode = member.getCheckCode();

            // 저장된 코드와 들어온 코드를 비교해보자
            if (storedCode.equals(code)) {
                member.updateCheckUser(true);
                System.out.println("true");
                return true;
            } else {
                System.out.println("false");
                return false; // 코드가 일치하지x
            }
        } else {
            throw new MemberNotFoundException();
        }
    }
    public void sendFindPasswordCodeToEmail(String email) {

        checkcheckExistenceEmail(email);

        mailService.sendPasswordEmail(email);

    }




    private void checkPassword(String password, String savedPassword) {
        if (!passwordEncoder.matches(password, savedPassword)) {
            throw new MemberPasswordException();
        }
    }



    private void checkDuplicateEmail(String email) {

        Member member = memberRepository.findByEmail(email).orElse(null);
        if (member != null) {
            String memberEmail = member.getEmail();
            if (memberEmail != null && memberEmail.equals(email)) {
                throw new MemberlExistEmailException();
            }
        }
    }

    private void checkDuplicateNickname(String nickname) {

        Member member = memberRepository.findByNickname(nickname).orElse(null);
        if (member != null) {
            String memberNickname = member.getNickname();
            if (memberNickname != null && memberNickname.equals(nickname)) {
                throw new MemberExistNicknameException();}
        }
    }

    private void checkDuplicateNickname(String newNickname, String currentNickname) {
        if (newNickname != null && !newNickname.equals(currentNickname)) {
            Member member = memberRepository.findByNickname(newNickname).orElse(null);
            if (member != null) {
                throw new MemberExistNicknameException();
            }
        }
    }

    private void checkcheckExistenceEmail(String email) {

        Member member = memberRepository.findByEmail(email).orElse(null);

        if (!member.getEmail().equals(email)) {
            throw new MemberNotFoundException();
        }
    }



    private Member ExistingMember(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
        return member;
    }

    private void comparisonMembers(Long loginMemberId, Long memberId) {
        if (!loginMemberId.equals(memberId)) {
            throw new MemberAccessDeniedException();
        }
    }

    private boolean checkEmailCode(String email, String code) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            String storedCode = member.getCheckCode();

            // 저장된 코드와 들어온 코드를 비교하여 일치하는지 확인
            if (storedCode.equals(code)) {
                return true;
            } else {
                return false; // 코드가 일치하지 않는 경우 false 반환
            }
        } else {
            throw new MemberNotFoundException(); // 멤버가 존재하지 않는 경우 예외 던지기
        }
    }

}
