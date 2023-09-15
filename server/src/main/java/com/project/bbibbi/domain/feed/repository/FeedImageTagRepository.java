//package com.project.bbibbi.domain.feed.repository;
//
//import com.project.bbibbi.domain.feed.entity.FeedImageTag;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//public interface FeedImageTagRepository extends JpaRepository<FeedImageTag, Long> {
//
//    @Modifying
//    @Query(value = "delete from feed_image_tag where feed_image_id = :feedImageId",nativeQuery = true)
//    void deleteByFeedImageId(@Param("feedImageId") long feedImageId);
//}
