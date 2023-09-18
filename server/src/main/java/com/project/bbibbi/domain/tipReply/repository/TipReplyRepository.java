package com.project.bbibbi.domain.tipReply.repository;

import com.project.bbibbi.domain.tipReply.entity.TipReply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TipReplyRepository extends JpaRepository<TipReply, Long> {
    Page<TipReply> findAllByTip_TipId(Long tipId, Pageable pageable);
}
