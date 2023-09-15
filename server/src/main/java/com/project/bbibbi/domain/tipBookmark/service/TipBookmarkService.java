package com.project.bbibbi.domain.tipBookmark.service;

import com.project.bbibbi.domain.tipBookmark.entity.TipBookmark;
import com.project.bbibbi.domain.tipBookmark.repository.TipBookmarkRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class TipBookmarkService {

    private final TipBookmarkRepository tipBookmarkRepository;

    public TipBookmarkService(TipBookmarkRepository tipBookmarkRepository) {
        this.tipBookmarkRepository = tipBookmarkRepository;
    }

    public TipBookmark settingTipBookmark(TipBookmark tipBookmark) {

        Integer existCount = tipBookmarkRepository.existCount(tipBookmark.getTip().getTipId(), tipBookmark.getMember().getMemberId());

        if (existCount == 0) {
            tipBookmarkRepository.save(tipBookmark);
        }
        else {
            tipBookmarkRepository.deleteByTipIdAndMemberId(tipBookmark.getTip().getTipId(), tipBookmark.getMember().getMemberId());
        }

        Integer updatedBookmarkCount = tipBookmarkRepository.existCount(tipBookmark.getTip().getTipId(), tipBookmark.getMember().getMemberId());

        TipBookmark updatedTipBookmark = new TipBookmark();
        updatedTipBookmark.setTip(tipBookmark.getTip());
        updatedTipBookmark.setMember(tipBookmark.getMember());

        if (updatedBookmarkCount == 0) {
            updatedTipBookmark.setBookmarkYn(false);
        }
        else {
            updatedTipBookmark.setBookmarkYn(true);
        }

        updatedTipBookmark.setBookmarkCount(tipBookmarkRepository.tipBookmarkCount(tipBookmark.getTip().getTipId()));

        return updatedTipBookmark;
    }
}
