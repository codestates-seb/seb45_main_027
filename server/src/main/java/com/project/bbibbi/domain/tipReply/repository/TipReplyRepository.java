package com.project.bbibbi.domain.tipReply.repository;

import com.project.bbibbi.domain.tipReply.entity.TipReply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TipReplyRepository extends JpaRepository<TipReply, Long> {
    List<TipReply> findAllByTip_TipId(Long tipId);
}
