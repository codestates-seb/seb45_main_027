package com.project.bbibbi.domain.feedReply.repository;

import com.project.bbibbi.domain.feedReply.entity.FeedReply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedReplyRepository extends JpaRepository<FeedReply, Long> {
    Page<FeedReply> findAllByFeedFeedId(Long feedId, Pageable pageable);
}

