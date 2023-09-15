package com.project.bbibbi.domain.tipLike.service;

import com.project.bbibbi.domain.tipLike.entity.TipLike;
import com.project.bbibbi.domain.tipLike.repository.TipLikeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class TipLikeService {

    private final TipLikeRepository tipLikeRepository;

    public TipLikeService(TipLikeRepository tipLikeRepository) {
        this.tipLikeRepository = tipLikeRepository;
    }

    public TipLike settingTipLike (TipLike tipLike) {

        Integer existCount = tipLikeRepository.existCount(tipLike.getTip().getTipId(), tipLike.getMember().getMemberId());

        if (existCount == 0){
            tipLikeRepository.save(tipLike);
        }
        else {
            tipLikeRepository.deleteByTipIdAndMemberId(tipLike.getTip().getTipId(), tipLike.getMember().getMemberId());
        }

        Integer updatedLikeCount = tipLikeRepository.existCount(tipLike.getTip().getTipId(), tipLike.getMember().getMemberId());

        TipLike updatedTipLike = new TipLike();
        updatedTipLike.setTip(tipLike.getTip());
        updatedTipLike.setMember(tipLike.getMember());

        if(updatedLikeCount == 0){
            updatedTipLike.setLikeYn(false);
        }
        else {
            updatedTipLike.setLikeYn(true);
        }

        updatedTipLike.setLikeCount(tipLikeRepository.tipLikeCount(tipLike.getTip().getTipId()));

        return updatedTipLike;
    }
}
