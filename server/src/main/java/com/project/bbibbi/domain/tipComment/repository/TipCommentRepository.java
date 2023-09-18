package com.project.bbibbi.domain.tipComment.repository;


import com.project.bbibbi.domain.tipComment.entity.TipComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TipCommentRepository extends JpaRepository<TipComment, Long> {
    @Query (value = "select * from tip_comment where tip_reply_id =:tipReplyId  ",
            nativeQuery = true )
    List<TipComment> findByTipReplyId(@Param("tipReplyId") Long tipReplyId);

    @Query(value = "select count(*) from tip_comment where tip_reply_id = tipReplyId", nativeQuery = true)
    Integer getCommentCount (@Param("tipReplyId") Long tipReplyId);
}
