package com.project.bbibbi.domain.feedReply.service;

import com.project.bbibbi.domain.feed.repository.FeedRepository;
import com.project.bbibbi.domain.feedComment.dto.FeedCommentDto;
import com.project.bbibbi.domain.feedReply.FeedReplyNotFoundException.FeedReplyNotFoundException;
import com.project.bbibbi.domain.feedReply.dto.FeedReplyRequestDto;
import com.project.bbibbi.domain.feedReply.dto.FeedReplyResponseDto;
import com.project.bbibbi.domain.feedReply.entity.FeedReply;
import com.project.bbibbi.domain.feedReply.repository.FeedReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class FeedReplyService {

    private final FeedReplyRepository feedReplyRepository;

    private final FeedRepository feedRepository;


    public FeedReply replySave(FeedReply feedReply) {
        // 저장 전 로직이 필요한 경우 여기에 추가

        return feedReplyRepository.save(feedReply);
    }


    //겟요청,

    public FeedReplyResponseDto findReply(Long replyId) {

        FeedReply reply = feedReplyRepository.findById(replyId)
                .orElseThrow(() -> new FeedReplyNotFoundException("댓글이 존재하지 않습니다."));
        return FeedReplyResponseDto.builder()
                .feedReplyId(reply.getFeedReplyId())
                .content(reply.getContent())
                .feedId(reply.getFeed().getFeedId())
                .memberId(reply.getMember().getMemberId())
                .nickname(reply.getMember().getNickname())
                .createdDateTime(reply.getCreatedDateTime())
                .comments(reply.getComments().stream().map(feedComment -> FeedCommentDto.builder()
                        .feedCommentId(feedComment.getFeedCommentId())
                        .content(feedComment.getContent())
                        .memberId(feedComment.getMember().getMemberId())
                        .feedReplyId(feedComment.getFeedReply().getFeedReplyId())
                        .parentComment(feedComment.getParentComment())
                        .commentOrder(feedComment.getParentComment())
                        .nickname(feedComment.getMember().getNickname())
                        .feedId(feedComment.getFeed().getFeedId())
                        .build())
                        .collect(Collectors.toList()))
                .build();
    }
    public Optional<FeedReply> findById(Long replyId) {
        return feedReplyRepository.findById(replyId);
    }



    // findReply 메서드는 댓글 ID를 받아 해당 ID로 댓글을 조회하여 해당 댓글의 정보를 FeedReplyResponseDto 객체에 매핑하여 반환
    // 만약 해당 ID로 댓글을 찾을 수 없다면 FeedReplyNotFoundException을 던짐


    // 패치요청,
    public FeedReply updateReply(Long replyId, FeedReplyRequestDto dto) {
        Optional<FeedReply> optionalFeedReply = feedReplyRepository.findById(replyId);

        if (optionalFeedReply.isPresent()) {
            FeedReply feedReply = optionalFeedReply.get();

            // 새로운 내용으로 댓글을 수정합니다.
            feedReply.setContent(dto.getContent());
            // 수정된 댓글을 저장합니다.
            FeedReply updatedReply = feedReplyRepository.save(feedReply);
            return updatedReply;
        } else {
            throw new FeedReplyNotFoundException("댓글을 찾을 수 없습니다. ID: " + replyId);
        }
    }

        // 딜리트요청
        public void deleteReply (Long replyId){
            FeedReply reply = feedReplyRepository.findById(replyId)
                    .orElseThrow(() -> new FeedReplyNotFoundException("댓글이 존재하지 않습니다."));

            // 댓글을 삭제합니다.
            feedReplyRepository.deleteById(replyId);
        }
    public List<FeedReply> getAllReplyForFeed(Long feedId) {
        // 특정 게시물에 대한 댓글 목록을 조회합니다.
        return feedReplyRepository.findAllByFeed_FeedId(feedId);
    }



}

