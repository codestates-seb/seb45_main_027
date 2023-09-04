package com.project.bbibbi.domain.follow.repository;


import com.project.bbibbi.domain.follow.entity.Follow;
import com.project.bbibbi.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository  extends JpaRepository<Follow, Long> {
    @Modifying
    @Query(value = "delete from follow where from_member_id = :fromMemberId and member_id = :memberId ",nativeQuery = true)
    void deleteByFromMemberIdAndMemberId(@Param("fromMemberId") Long fromMemberId, @Param("memberId") Long memberId);

    @Query(value = "select count(*) from follow where from_member_id = :fromMemberId and member_id = :memberId", nativeQuery = true)
    Integer existCount(@Param("fromMemberId") Long fromMemberId, @Param("memberId") Long memberId);

    @Query(value = "select * from follow where from_member_id = :memberId", nativeQuery = true)
    List<Follow> findByFromMemberId(@Param("memberId") Long memberId);

    @Query(value = "select * from follow where member_id = :memberId", nativeQuery = true)
    List<Follow> findByMemberId(@Param("memberId") Long memberId);

    @Query(value = "select n from Member n where n.memberId = :memberId ")
    Member fromMember(@Param("memberId")  Long memberId);

    @Query(value = "select n from Member n where n.memberId = :memberId ")
    Member toMember(@Param("memberId") Long memberId);

}
