package com.project.bbibbi.domain.tipReplyLike.service;

import com.project.bbibbi.domain.tipReplyLike.entity.TipReplyLike;
import com.project.bbibbi.domain.tipReplyLike.repository.TipReplyLikeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class TipReplyLikeService {

    private final TipReplyLikeRepository tipReplyLikeRepository;

    public TipReplyLikeService(TipReplyLikeRepository tipReplyLikeRepository) {
        this.tipReplyLikeRepository = tipReplyLikeRepository;
    }

    public TipReplyLike settingTipReplyLike(TipReplyLike tipReplyLike) {

        Integer existCount = tipReplyLikeRepository.existCount(tipReplyLike.getTipReply().getTipReplyId(), tipReplyLike.getMember().getMemberId());

        if (existCount == 0) {
            tipReplyLikeRepository.save(tipReplyLike);
        } else {
            tipReplyLikeRepository.deleteByTipReplyIdAndMemberId(tipReplyLike.getTipReply().getTipReplyId(), tipReplyLike.getMember().getMemberId());
        }

        Integer updatedLikeCount = tipReplyLikeRepository.existCount(tipReplyLike.getTipReply().getTipReplyId(), tipReplyLike.getMember().getMemberId());

        TipReplyLike updatedTipReplyLike = new TipReplyLike();
        updatedTipReplyLike.setTipReply(tipReplyLike.getTipReply());
        updatedTipReplyLike.setMember(tipReplyLike.getMember());

        if (updatedLikeCount == 0) {
            updatedTipReplyLike.setLikeYn(false);
        } else {
            updatedTipReplyLike.setLikeYn(true);
        }

        updatedTipReplyLike.setLikeCount(tipReplyLikeRepository.replyLikeCount(tipReplyLike.getTipReply().getTipReplyId()));

        return updatedTipReplyLike;
    }
}
