package com.project.bbibbi.domain.tipLike.repository;

import com.project.bbibbi.domain.tipLike.entity.TipLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TipLikeRepository extends JpaRepository<TipLike, Long> {

    @Modifying
    @Query(value = "delete from tip_like where tip_id = :tipId and member_id = :memberId ", nativeQuery = true)
    void deleteByTipIdAndMemberId(@Param("tipId") Long tipId, @Param("memberId") Long memberId);

    @Query(value = "select count(*) from tip_like where tip_id = :tipId and member_id = :memberId ", nativeQuery = true)
    Integer existCount(@Param("tipId") Long tipId, @Param("memberId") Long memberId);

    @Query(value = "select count(*) from tip_like where tip_id = :tipId", nativeQuery = true)
    Integer tipLikeCount(@Param("tipId") Long tipId);

    @Modifying
    @Query(value = "delete from tip_like where tip_id = :tipId ", nativeQuery = true)
    void deleteByTipId(@Param("tipId") Long tipId);

}
