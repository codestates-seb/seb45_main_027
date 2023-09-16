package com.project.bbibbi.domain.feedReplyLike.service;

import com.project.bbibbi.domain.feedReplyLike.entity.FeedReplyLike;
import com.project.bbibbi.domain.feedReplyLike.repository.FeedReplyLikeRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
public class FeedReplyLikeService {

    private final FeedReplyLikeRepository feedReplyLikeRepository;

    public FeedReplyLikeService(FeedReplyLikeRepository feedReplyLikeRepository) {
        this.feedReplyLikeRepository = feedReplyLikeRepository;
    }
    public FeedReplyLike settingFeedReplyLike(FeedReplyLike feedReplyLike) {
        // 해당 댓글과 유저에 대한 좋아요 여부 조회
        Integer existCount =
                feedReplyLikeRepository.existCount(feedReplyLike.getFeedReply().getFeedReplyId(), feedReplyLike.getMember().getMemberId());

        // 좋아요 토글
        if (existCount == 0) {
            // FeedReplyLike 엔티티 저장
            feedReplyLikeRepository.save(feedReplyLike);
        } else {
            feedReplyLikeRepository.deleteByFeedReplyIdAndMemberId(
                    feedReplyLike.getFeedReply().getFeedReplyId(), feedReplyLike.getMember().getMemberId());
        }

        Integer updatedLikeCount
                = feedReplyLikeRepository.existCount
                (feedReplyLike.getFeedReply().getFeedReplyId(), feedReplyLike.getMember().getMemberId());

        // 업데이트된 FeedReplyLike 객체 생성
        FeedReplyLike updatedFeedReplyLike = new FeedReplyLike();
        updatedFeedReplyLike.setFeedReply(feedReplyLike.getFeedReply());
        updatedFeedReplyLike.setMember(feedReplyLike.getMember());

        if (updatedLikeCount == 0) {
            updatedFeedReplyLike.setReplyLikeYn(false);
        } else {
            updatedFeedReplyLike.setReplyLikeYn(true);
        }

        updatedFeedReplyLike.setLikeCount(feedReplyLikeRepository.feedReplyLikeCount(
                feedReplyLike.getFeedReply().getFeedReplyId()));

        return updatedFeedReplyLike;
    }

}
