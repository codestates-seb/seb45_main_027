package com.project.bbibbi.domain.tipTag.repository;

import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipTag.entity.TipTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TipTagRepository extends JpaRepository<TipTag, Long> {

    List<TipTag> findAllByTip(Tip tip);
}

