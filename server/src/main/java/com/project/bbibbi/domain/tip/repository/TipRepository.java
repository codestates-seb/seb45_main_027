package com.project.bbibbi.domain.tip.repository;

import com.project.bbibbi.domain.tip.entity.Tip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface TipRepository extends JpaRepository<Tip, Long> {
    // ...

    @Modifying
    @Query(value = "delete from tip_image where tip_image_id = :tipImageId", nativeQuery = true)
    void deleteImageById(@Param("tipImageId") Long tipImageId);

    @Modifying
    @Query(value = "insert into tip_image(created_date_time, modified_date_time, image, tip_id) values(:createdDateTime, :modifiedDateTime, :image, :tipId )", nativeQuery = true)
    void insertImageForce(@Param("createdDateTime") LocalDateTime createdDateTime, @Param("modifiedDateTime") LocalDateTime modifiedDateTime,
                          @Param("image") String image, @Param("tipId") Long tipId);



}
