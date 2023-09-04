package com.project.bbibbi.domain.member.repository;

import com.project.bbibbi.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String nickname);

    Optional<Member> findByRefreshToken(String refreshToken);

//    Page<MemberFeedData> findFeedByMemberId(Long memberId, Pageable pageable);
//
//    Page<MemberTipData> findTipByMemberId(Long memberId, Pageable pageable);
//
//    Page<MemberFeedBookmarkData> findFeedBookmarkByMemberId(Long memberId, Pageable pageable);
//
//    Page<MemberTipBookmarkData> findTipBookmarkByMemberId(Long memberId, Pageable pageable);
//
//    page<MemberFeedLikeData> findFeedLikeByMemberId(Long memberId, Pageable pageable);
//
//    page<MemberTipLikeData> findTipLikeByMemberId(Long memberId, Pageable pageable);


}
