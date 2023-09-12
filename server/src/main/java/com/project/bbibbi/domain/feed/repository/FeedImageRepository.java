package com.project.bbibbi.domain.feed.repository;

import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feed.entity.FeedImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FeedImageRepository extends JpaRepository<FeedImage, Long> {


    @Modifying
    @Query(value = "delete from feed_image where feed_id = :feedId",nativeQuery = true)
    void deleteByFeedId(@Param("feedId") Long feedId);
}
