package com.project.bbibbi.domain.tip.repository;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.entity.Tip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TipRepository extends JpaRepository<Tip, Long>, TipRepositoryCustom {
    // ...

    @Modifying
    @Query(value = "delete from tip_image where tip_image_id = :tipImageId", nativeQuery = true)
    void deleteImageById(@Param("tipImageId") Long tipImageId);

    @Modifying
    @Query(value = "insert into tip_image(created_date_time, modified_date_time, image, tip_id) values(:createdDateTime, :modifiedDateTime, :image, :tipId )", nativeQuery = true)
    void insertImageForce(@Param("createdDateTime") LocalDateTime createdDateTime, @Param("modifiedDateTime") LocalDateTime modifiedDateTime,
                          @Param("image") String image, @Param("tipId") Long tipId);

    Page<Tip> findByMember(Member member, Pageable pageable);

//    @Query(value = "select tip.* from (select b.tip_id, row_number() over(order by b.created_date_time desc) as row_num " +
//            "from (select * from tip where title like %:searchString% or content like %:searchString% ) as b ) as ranked_tip " +
//            "inner join (select * from tip where title like %:searchString% or content like %:searchString% ) as tip " +
//            "on ranked_tip.tip_id = tip.tip_id " +
//            "where ranked_tip.row_num > :page * :size " +
//            "order by created_date_time desc limit :size ", nativeQuery = true)
//    List<Tip> findAllSearch (@Param("searchString") String searchString, @Param("page") int page, @Param("size") int size);
}
