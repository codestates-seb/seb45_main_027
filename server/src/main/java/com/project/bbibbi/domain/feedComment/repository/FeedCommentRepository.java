package com.project.bbibbi.domain.feedComment.repository;


import com.project.bbibbi.domain.feedComment.entity.FeedComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedCommentRepository
        extends JpaRepository<FeedComment, Long> {
    @Query (value = "select * from feed_comment where feed_reply_id =:feedReplyId  ",
            nativeQuery = true )
    List<FeedComment> findByFeedReplyId(@Param("feedReplyId") Long feedReplyId);
}
