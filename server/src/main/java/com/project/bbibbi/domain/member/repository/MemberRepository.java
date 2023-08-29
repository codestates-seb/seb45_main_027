package com.project.bbibbi.domain.member.repository;

import com.project.bbibbi.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface MemberRepository extends JpaRepository<Member, Long> {
}
