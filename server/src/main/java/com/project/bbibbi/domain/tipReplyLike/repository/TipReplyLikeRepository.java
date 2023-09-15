package com.project.bbibbi.domain.tipReplyLike.repository;

import com.project.bbibbi.domain.tipReplyLike.entity.TipReplyLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TipReplyLikeRepository extends JpaRepository<TipReplyLike, Long> {

    @Modifying
    @Query(value = "delete from tip_reply_like where tip_reply_id = :tipReplyId and member_id = :memberId", nativeQuery = true)
    void deleteByTipReplyIdAndMemberId(@Param("tipReplyId") Long tipReplyId, @Param("memberId") Long memberId);

    @Query(value = "select count(*) from tip_reply_like where tip_reply_id = :tipReplyId and member_id = :memberId", nativeQuery = true)
    Integer existCount(@Param("tipReplyId") Long tipReplyId, @Param("memberId") Long memberId);

    @Query(value = "select count(*) from tip_reply_like where tip_reply_id = :tipReplyId", nativeQuery = true)
    Integer replyLikeCount(@Param("tipReplyId") Long tipReplyId);
}
