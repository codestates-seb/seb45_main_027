package com.project.bbibbi.domain.feedBookmark.service;

import com.project.bbibbi.domain.feedBookmark.entity.FeedBookMark;
import com.project.bbibbi.domain.feedBookmark.repository.FeedBookMarkRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class FeedBookMarkService {

    private final FeedBookMarkRepository feedBookMarkRepository;

    public FeedBookMarkService(FeedBookMarkRepository feedBookMarkRepository) {
        this.feedBookMarkRepository = feedBookMarkRepository;
    }

    public FeedBookMark settingFeedBookMark (FeedBookMark feedBookMark) {

        Integer existCount = feedBookMarkRepository.existCount
                (feedBookMark.getFeed().getFeedId(), feedBookMark.getMember().getMemberId());

        if(existCount == 0){
            feedBookMarkRepository.save(feedBookMark);
        }
        else {
            feedBookMarkRepository.deleteByFeedIdAndMemberId
                    (feedBookMark.getFeed().getFeedId(), feedBookMark.getMember().getMemberId());
        }

        Integer updatedBookMarkCount = feedBookMarkRepository.existCount
                (feedBookMark.getFeed().getFeedId(), feedBookMark.getMember().getMemberId());


        FeedBookMark updatedFeedBookMark = new FeedBookMark();
        updatedFeedBookMark.setFeed(feedBookMark.getFeed());
        updatedFeedBookMark.setMember(feedBookMark.getMember());

        if(updatedBookMarkCount == 0){
            updatedFeedBookMark.setBookMarkYn(false);
        }
        else {
            updatedFeedBookMark.setBookMarkYn(true);
        }

        updatedFeedBookMark.setBookMarkCount
                (feedBookMarkRepository.feedBookMarkCount(feedBookMark.getFeed().getFeedId()));

        return updatedFeedBookMark;

    }
}
