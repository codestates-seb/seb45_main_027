package com.project.bbibbi.domain.tipTag.repository;

import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipTag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByTagContent(String tagContent);


    @Modifying
    @Query(value = "delete from tag where tip_id = :tipId ", nativeQuery = true)
    void deleteByTipId(@Param("tipId") long tipId);


}