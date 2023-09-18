package com.project.bbibbi.domain.feedComment.service;

import com.project.bbibbi.domain.feedComment.dto.FeedCommentDto;
import com.project.bbibbi.domain.feedComment.exception.FeedCommentNotFoundException;
import com.project.bbibbi.domain.feedComment.repository.FeedCommentRepository;
import com.project.bbibbi.domain.feedComment.entity.FeedComment;
import com.project.bbibbi.domain.feedReply.entity.FeedReply;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class FeedCommentService {

    private final FeedCommentRepository feedCommentRepository;
    private final MemberRepository memberRepository;
    public FeedComment saveComment(FeedComment feedComment) {

        FeedComment insertFeedComment= feedCommentRepository.save(feedComment);

        Optional<Member> optionalMember = memberRepository.findById(feedComment.getMember().getMemberId());

        Member member = optionalMember.orElseThrow(() -> {throw new RuntimeException() ; });

        insertFeedComment.setMember(Member.builder().memberId
                (feedComment.getMember().getMemberId()).nickname
                (member.getNickname()).build());

        return insertFeedComment;


    }

    public FeedCommentDto findComment(Long commentId) {
        FeedComment comment = feedCommentRepository.findById(commentId)
                .orElseThrow(() -> new FeedCommentNotFoundException("댓글이 존재하지 않습니다."));
        return FeedCommentDto.builder()
                .feedCommentId(comment.getFeedCommentId())
                .content(comment.getContent())
                .memberId(comment.getMember().getMemberId())
                .build();
    }

    public Optional<FeedComment> findById(Long commentId) {
        return feedCommentRepository.findById(commentId);
    }

    public FeedComment updateComment(Long commentId, FeedCommentDto dto) {
        Optional<FeedComment> optionalFeedComment = feedCommentRepository.findById(commentId);

        if (optionalFeedComment.isPresent()) {
            FeedComment feedComment = optionalFeedComment.get();

            // 새로운 내용으로 댓글을 수정합니다.
            feedComment.setContent(dto.getContent());

            // 수정된 댓글을 저장합니다.
            FeedComment updateComment = feedCommentRepository.save(feedComment);
            return updateComment;
        } else {
            throw new FeedCommentNotFoundException("댓글을 찾을 수 없습니다. ID: " + commentId);
        }
    }
//    이렇게 하면 댓글을 찾지 못한 경우에 예외가 발생하며, 이를 적절하게 처리할 수 있습니다.
//    필요에 따라 반환값을 null로 설정하고 호출하는 측에서 처리하는 방법도 가능합니다.
    public void deleteComment(Long commentId) {
        FeedComment comment = feedCommentRepository.findById(commentId)
                .orElseThrow(() -> new FeedCommentNotFoundException("댓글이 존재하지 않습니다."));

        // 댓글을 삭제합니다.
        feedCommentRepository.deleteById(commentId);
    }

    public List<FeedComment> getAllCommentsForFeed(Long feedReplyId) {
        // 특정 게시물에 대한 댓글 목록을 조회합니다.
        return feedCommentRepository.findByFeedReplyId(feedReplyId);
    }
    // 답글을 추가하는 메서드
    public FeedComment addComment(Long parentCommentId, FeedCommentDto dto) {
        // 부모 댓글을 찾습니다.
        FeedComment parentComment = feedCommentRepository.findById(parentCommentId)
                .orElseThrow(() -> new FeedCommentNotFoundException
                        ("부모 댓글이 존재하지 않습니다. ID: " + parentCommentId));


        // 새로운 답글을 생성합니다.
        FeedComment feedComment = new FeedComment();
        feedComment.setContent(dto.getContent());
        feedComment.setMember(parentComment.getMember());
        feedComment.setParentComment(parentComment.getFeedCommentId()); // 부모 댓글 ID를 저장

        // 순서 (commentOrder)를 설정해야 한다면, 순서를 설정해줄 수 있습니다.
        // 예를 들어, 현재 부모 댓글의 답글 개수를 가져와서 commentOrder를 설정한다고 가정해봅시다.
        // feedComment.setCommentOrder(parentComment.getReplyCount() + 1);

        // 답글을 저장합니다.
        return feedCommentRepository.save(feedComment);
    }

}
