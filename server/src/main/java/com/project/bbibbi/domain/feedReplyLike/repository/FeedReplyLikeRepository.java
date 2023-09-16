package com.project.bbibbi.domain.feedReplyLike.repository;

import com.project.bbibbi.domain.feedReplyLike.entity.FeedReplyLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedReplyLikeRepository extends JpaRepository<FeedReplyLike, Long> {

    @Modifying
    @Query(value = "DELETE FROM feed_reply_like WHERE feed_reply_id = :feedReplyId AND member_id = :memberId",
            nativeQuery = true)
    void deleteByFeedReplyIdAndMemberId
            (@Param("feedReplyId") Long feedReplyId, @Param("memberId") Long memberId);

    @Query(value = "SELECT COUNT(*) FROM feed_reply_like WHERE feed_reply_id =" +
            " :feedReplyId AND member_id = :memberId", nativeQuery = true)
    Integer existCount(@Param("feedReplyId") Long feedReplyId, @Param("memberId") Long memberId);

    @Query(value = "SELECT COUNT(*) FROM feed_reply_like WHERE feed_reply_id = :feedReplyId",
            nativeQuery = true)
    Integer feedReplyLikeCount(@Param("feedReplyId") Long feedReplyId);
};
