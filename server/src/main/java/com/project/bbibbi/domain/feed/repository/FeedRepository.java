package com.project.bbibbi.domain.feed.repository;

import com.project.bbibbi.domain.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Long> {

    @Query(value = "select * from feed where location = :searchcode", nativeQuery = true)
    List<Feed> findByLocation(@Param("searchcode") String searchcode);

    @Query(value = "select * from feed where room_count = :searchcode", nativeQuery = true)
    List<Feed> findByRoomCount(@Param("searchcode") String searchcode);

    @Query(value = "select * from feed where room_info = :searchcode", nativeQuery = true)
    List<Feed> findByRoomInfo(@Param("searchcode") String searchcode);

    @Query(value = "select * from feed where room_size = :searchcode", nativeQuery = true)
    List<Feed> findByRoomSize(@Param("searchcode") String searchcode);

    @Query(value = "select * from feed where room_type = :searchcode", nativeQuery = true)
    List<Feed> findByRoomType(@Param("searchcode") String searchcode);

    //검색 쿼리로 가능 %로 order by created_date_time desc 작성시간 최신순으로 뿌려준다.
    @Query(value = "select * from feed where title like %:searchCode% or content " +
            "like %:searchCode% order by created_date_time desc", nativeQuery = true)
    List<Feed> findByFeed(@Param("searchCode") String searchCode);

//    @Query(value = "select * from feed order by created_date_time desc", nativeQuery = true)
    List<Feed> findByOrderByCreatedDateTimeDesc();

}
