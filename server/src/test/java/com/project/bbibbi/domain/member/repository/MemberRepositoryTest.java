//package com.project.bbibbi.domain.member.repository;
//
//import com.project.bbibbi.domain.member.entity.Member;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.persistence.EntityManager;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@Transactional
//class MemberRepositoryTest {
//
//    @Autowired
//    MemberRepository memberRepository;
//    @Autowired
//    EntityManager em;
//
//    @AfterEach
//    private void after(){
//        em.clear();}
//
//    @Test
//    @DisplayName("레파짓에서 이메일로 찾아오기")
//    public void findByEmail() {
//            // given
//            Member member = Member.builder()
//                    .email("user@naver.com")
//                    .password("admk12334!")
//                    .nickname("gkasdnaj")
//                    .image(null)
//                    .myIntro(null)
//                    .build();
//
//            // when
//            Member saveMember = memberRepository.save(member);
//
//            Member findMember = memberRepository.findById(saveMember.getMemberId()).
//                    orElseThrow(() -> new RuntimeException("저장된 회원이 없습니다"));
//
//            assertThat(findMember).isSameAs(saveMember);
//            assertThat(findMember).isSameAs(member);
//        }
//    }
