package com.project.bbibbi.domain.tipTag.repository;

import com.project.bbibbi.domain.tipTag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByTagContent(String tagContent);
}