package com.project.bbibbi.domain.feedComment.controller;

import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feedComment.dto.FeedCommentDto;
import com.project.bbibbi.domain.feedComment.entity.FeedComment;
import com.project.bbibbi.domain.feedComment.service.FeedCommentService;
import com.project.bbibbi.domain.feedReply.entity.FeedReply;
import com.project.bbibbi.domain.member.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/feed/{feed-id}/feedReply/{feed-reply-id}/feedComment")
public class FeedCommentController {

    private final FeedCommentService feedCommentService;

    @Autowired
    public FeedCommentController(FeedCommentService feedCommentService) {
        this.feedCommentService = feedCommentService;
    }

    @PostMapping
    public ResponseEntity<FeedCommentDto> createComment(
            @PathVariable("feed-id" ) Long feedId,
            @PathVariable("feed-reply-id" ) Long feedReplyId,
            @RequestBody FeedCommentDto dto) {
        // 새로운 FeedComment 엔티티를 생성하고 값을 설정합니다.
        FeedComment feedComment = new FeedComment();
        //임의 멤버아이디 1으로 설정
        feedComment.setMember(Member.builder().memberId(1L).build());
        //feedId와 feedReplyId 가져오는 설정
        Feed feed = new Feed();
        feed.setFeedId(feedId);
        feedComment. setFeed(feed);
        System.out.println("feedComment.feed.feedId ////////" + feedComment.getFeed().getFeedId());
        feedComment.setFeedReply(FeedReply.builder().feedReplyId(feedReplyId).build());
        System.out.println("feedComment.feedReply //////////" + feedComment.getFeedReply().getFeedReplyId());
        feedComment.setContent(dto.getContent());
        feedComment.setParentComment(dto.getParentComment());
        // 나머지 필드도 필요한 대로 설정합니다.
        // 저장 로직
        FeedComment savedComment = feedCommentService.saveComment(feedComment);
        // 저장된 엔티티를 DTO로 변환하여 응답합니다.

        FeedCommentDto responseDto = FeedCommentDto.toDto(savedComment);
        return ResponseEntity.ok(responseDto);
    }

//    @PostMapping("/FeedComment/{parentCommentId}")
//    public ResponseEntity<FeedCommentDto> createComment(
//            @PathVariable Long parentCommentId,
//            @RequestBody FeedCommentDto dto) {
//        FeedComment feedComment = feedCommentService.addComment(parentCommentId, dto);
//        return ResponseEntity.ok(convertToDto(feedComment));
//    }

//    feedreply 1 을 조회했을때 feedreply 1에 달린 답글들이 주르르륵 나오게 구현하면
//            답글 전체조회를 할수있는것을 안만들어도 되지않나요.
    @GetMapping("/{commentId}")
    public ResponseEntity<FeedCommentDto> findComment(@PathVariable Long commentId) {
        Optional<FeedComment> optionalFeedComment = feedCommentService.findById(commentId);
        if (optionalFeedComment.isPresent()) {
            FeedComment feedComment = optionalFeedComment.get();
            return ResponseEntity.ok(convertToDto(feedComment));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<FeedCommentDto> updateComment(
            @PathVariable Long commentId,
            @RequestBody FeedCommentDto dto) {
        Optional<FeedComment> optionalFeedComment = feedCommentService.findById(commentId);
        if (optionalFeedComment.isPresent()) {
            FeedComment feedComment = optionalFeedComment.get();
            feedCommentService.updateComment(commentId, dto);
            return ResponseEntity.ok(convertToDto(feedComment));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId) {
        feedCommentService.deleteComment(commentId);
        return ResponseEntity.ok("답글이 성공적으로 삭제되었습니다.");
    }

    private FeedCommentDto convertToDto(FeedComment feedComment) {
        return FeedCommentDto.builder()
                .feedCommentId(feedComment.getFeedCommentId())
                .content(feedComment.getContent())
                .memberId(feedComment.getMember().getMemberId())
                .build();
    }
}
