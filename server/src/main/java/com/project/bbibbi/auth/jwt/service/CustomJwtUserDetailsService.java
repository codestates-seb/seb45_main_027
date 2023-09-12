package com.project.bbibbi.auth.jwt.service;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomJwtUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member findMember = optionalMember.orElseThrow(() -> new UsernameNotFoundException("이메일이 없습니다"));
        //Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("이메일이 없습니다"));
        // 멤버낫파운드 익셉션 발생시킬까 ?

//        return User.builder().username(member.getEmail())
//                .password(member.getPassword())
//                .build();

//        return org.springframework.security.core.userdetails.User.builder()
//                .username(findMember.getEmail())
//                .password(findMember.getPassword())
//                .roles(findMember.getRole().name())
//                .build();
//        return CustomJwtUserDetails.builder()
//                .username(findMember.getEmail())
//                .password(findMember.getPassword())
//                .roles(findMember.getRole().name())
//                .build();

        return new CustomJwtUserDetails(
                findMember.getMemberId(),
                findMember.getEmail(),
                findMember.getPassword(),
                findMember.getRole(),
                findMember.isCheckUser(),
                findMember.getProfileImg(),
                findMember.getNickname()
        );
    }
}
