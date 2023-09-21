package com.project.bbibbi.domain.feed.repository;

import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Long> {

//    @Query(value = "select * from feed where location = :searchcode", nativeQuery = true)
//    List<Feed> findByLocation(@Param("searchcode") String searchcode);
//
//    @Query(value = "select * from feed where room_count = :searchcode", nativeQuery = true)
//    List<Feed> findByRoomCount(@Param("searchcode") String searchcode);
//
//    @Query(value = "select * from feed where room_info = :searchcode", nativeQuery = true)
//    List<Feed> findByRoomInfo(@Param("searchcode") String searchcode);
//
//    @Query(value = "select * from feed where room_size = :searchcode", nativeQuery = true)
//    List<Feed> findByRoomSize(@Param("searchcode") String searchcode);
//
//    @Query(value = "select * from feed where room_type = :searchcode", nativeQuery = true)
//    List<Feed> findByRoomType(@Param("searchcode") String searchcode);
//
//    //검색 쿼리로 가능 %로 order by created_date_time desc 작성시간 최신순으로 뿌려준다.
//    @Query(value = "select * from feed where title like %:searchCode% or content " +
//            "like %:searchCode% order by created_date_time desc", nativeQuery = true)
//    List<Feed> findByFeed(@Param("searchCode") String searchCode);
//
////    @Query(value = "select * from feed order by created_date_time desc", nativeQuery = true)
//    List<Feed> findByOrderByCreatedDateTimeDesc();

    //    @Query(value = "select * from feed where member_id = :myInfoMemberId order by created_date_time desc limit :size", nativeQuery = true)
//    Page<Feed> findByMemberId(@Param("myInfoMemberId") long myInfoMemberId, @Param("size") int size);

    List<Feed> findByMemberOrderByCreatedDateTimeDesc(Member member); // 비쿼리방식 일단 성공한 방법

//    @Query(value = "select feed.* from feed " +
//            "inner join (select a.feed_id, ( select count(*) from feed_like where feed_id = a.feed_id) as like_count from feed a ) as feed_likecount " +
//            "on feed.feed_id = feed_likecount.feed_id " +
//            "where feed.member_id = :memberId " +
//            "order by feed_likecount.like_count desc, feed.created_date_time desc ", nativeQuery = true)
//    List<Feed> findByMemberLike(@Param("memberId") long memberId);

    @Query(value = "select * from feed where feed_id in " +
            "(select a.feed_id from feed_like a where a.member_id = :memberId )" +
            " order by created_date_time desc ", nativeQuery = true)
    List<Feed> findByMemberLike(@Param("memberId") long memberId);

//    @Query(value = "select feed.* from feed " +
//            "inner join (select a.feed_id, (select count(*) from feed_book_mark where feed_id = a.feed_id) as book_mark_count from feed a ) as feed_bookcount " +
//            "on feed.feed_id = feed_bookcount.feed_id " +
//            "where feed.member_id = :memberId " +
//            "order by feed_bookcount.book_mark_count desc, feed.created_date_time desc ", nativeQuery = true)
//    List<Feed> findByMemberBookMark(@Param("memberId") long memberId);

    @Query(value = "select * from feed where feed_id in " +
            "(select a.feed_id from feed_book_mark a where a.member_id = :memberId ) " +
            "order by created_date_time desc ", nativeQuery = true)
    List<Feed> findByMemberBookMark(@Param("memberId") long memberId);

    // 쿼리방식 성공.. 이렇게 쓸 경우 Page으로 타입으로 쓸 필요가 없다. 마찬가지로 service의 메서드도 Page로 받을 필요가 없다.
//    @Query(value = "select feed.* " +
//            "from ( select feed_id, ROW_NUMBER() OVER (ORDER BY created_date_time DESC) AS row_num from feed ) as ranked_feed " +
//            "inner join feed on ranked_feed.feed_id = feed.feed_id " +
//            "where feed.member_id = :myInfoMemberId and ranked_feed.row_num > :page * :size " +
//            "order by feed.created_date_time desc " +
//            "limit :size ", nativeQuery = true)
//    List<Feed> findByMember(@Param("myInfoMemberId") long myInfoMemberId,@Param("page") int page,@Param("size") int size);

    ////////// 페이지네이션

    Page<Feed> findByLocation(Location searchcode, Pageable pageable);

    Page<Feed> findByRoomCount(RoomCount searchcode, Pageable pageable);

    Page<Feed> findByRoomInfo(RoomInfo searchcode, Pageable pageable);

    Page<Feed> findByRoomSize(RoomSize searchcode, Pageable pageable);

    Page<Feed> findByRoomType(RoomType roomType, Pageable pageable);

    Page<Feed> findByOrderByCreatedDateTimeDesc(Pageable pageable);

//    @Query(value = "select feed.* from (select b.feed_id, row_number() over(order by b.created_date_time desc) as row_num " +
//            "from (select * from feed where title like %:searchString% or content like %:searchString% ) as b ) as ranked_feed " +
//            "inner join (select * from feed where title like %:searchString% or content like %:searchString% ) as feed " +
//            "on ranked_feed.feed_id = feed.feed_id " +
//            "where ranked_feed.row_num > :page * :size " +
//            "order by created_date_time desc limit :size ", nativeQuery = true)
//    List<Feed> findBySearch(@Param("searchString") String searchString,@Param("page") int page,@Param("size") int size);

    @Query(value = "select feed.* from (select b.feed_id, row_number() over(order by b.created_date_time desc) as row_num " +
            "from (select cf.* from (select p.*, TRIM(BOTH ' ' FROM REGEXP_REPLACE(p.content, '\\\\<.*?\\\\>', '')) AS clean_content\n" +
            "\t\t\t\t\t\tfrom feed p ) cf where cf.title like %:searchString% or cf.clean_content like %:searchString% ) as b ) as ranked_feed " +
            "inner join (select cf.* from (select p.*, TRIM(BOTH ' ' FROM REGEXP_REPLACE(p.content, '\\\\<.*?\\\\>', '')) AS clean_content\n" +
            "\t\t\t\t\t\tfrom feed p ) cf where cf.title like %:searchString% or cf.clean_content like %:searchString% ) as feed " +
            "on ranked_feed.feed_id = feed.feed_id " +
            "where ranked_feed.row_num > :page * :size " +
            "order by created_date_time desc limit :size ", nativeQuery = true)
    List<Feed> findBySearch(@Param("searchString") String searchString,@Param("page") int page,@Param("size") int size);

//    @Query(value = "select feed.* from (select b.feed_id, row_number() over(order by b.created_date_time desc) as row_num " +
//            "from (select * from feed where title like %||:searchString||% or content like %||:searchString||% ) as b ) as ranked_feed " +
//            "inner join (select * from feed where title like %||:searchString||% or content like %||:searchString||% ) as feed " +
//            "on ranked_feed.feed_id = feed.feed_id " +
//            "where ranked_feed.row_num > :page * :size " +
//            "order by created_date_time desc limit :size ", nativeQuery = true)
//    List<Feed> findBySearch(@Param("searchString") String searchString,@Param("page") int page,@Param("size") int size);

//    @Query(value = "select count(*) from feed where title like %:searchString% or content like %:searchString%", nativeQuery = true)
//    Integer findBySearchCount(@Param("searchString") String searchString);

    @Query(value = "select count(*)\n" +
            "from ( select p.*, TRIM(BOTH ' ' FROM REGEXP_REPLACE(p.content, '\\\\<.*?\\\\>', '')) AS clean_content\n" +
            "from feed p) pp\n" +
            "where pp.title like %:searchString% or pp.clean_content like %:searchString% ", nativeQuery = true)
    Integer findByCleanSearchCount(@Param("searchString") String searchString);

    @Query(value = "select feed.* from feed " +
            "inner join (select a.feed_id, ( select count(*) from feed_like where feed_id = a.feed_id) as like_count from feed a ) as feed_likecount " +
            "on feed.feed_id = feed_likecount.feed_id " +
            "order by feed_likecount.like_count desc, feed.created_date_time desc ", nativeQuery = true)
    List<Feed> findByOrderByLike();

    Page<Feed> findByOrderByViewsDesc(Pageable pageable);

    @Query(value = "select feed.* from feed " +
            "inner join (select a.feed_id, ( select count(*) from feed_like where feed_id = a.feed_id) as like_count from feed a ) as feed_likecount " +
            "on feed.feed_id = feed_likecount.feed_id " +
            "order by feed_likecount.like_count desc, feed.created_date_time desc limit 10", nativeQuery = true)
    List<Feed> findByLikeTopTen();

}
