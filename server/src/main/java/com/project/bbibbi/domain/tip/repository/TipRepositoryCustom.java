package com.project.bbibbi.domain.tip.repository;

import com.project.bbibbi.domain.tip.entity.Tip;
import org.springframework.data.domain.*;

public interface TipRepositoryCustom {

    Slice<Tip> findAllTipsPageableOrderByCreatedAtDesc(String searchString, Pageable pageable);
}
