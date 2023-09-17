package com.project.bbibbi.domain.feedReply.controller;


import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.feed.dto.FeedResponseDto;
import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feedReply.dto.FeedReplyRequestDto;
import com.project.bbibbi.domain.feedReply.dto.FeedReplyResponseDto;
import com.project.bbibbi.domain.feedReply.entity.FeedReply;
import com.project.bbibbi.domain.feedReply.repository.FeedReplyRepository;
import com.project.bbibbi.domain.feedReply.service.FeedReplyService;
import com.project.bbibbi.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RequestMapping("/feed/{feed-id}/feedReply")
@RestController
public class FeedReplyController {
    private final FeedReplyService feedReplyService;
 /* CREATE */
// {reply-id}

@PostMapping
public ResponseEntity feedSave(@PathVariable ("feed-id")Long feedId,
    @RequestBody FeedReplyRequestDto dto)

{//dto -> entity 객체로 변환작업
    //유저 로그인
    Long memberId = loginUtils.getLoginId();
    FeedReply feedReply = new FeedReply(); // FeedReply 클래스의 기본 생성자 호출
    feedReply.setMember(Member.builder().memberId(memberId).build()); //임시로 memberId 설정
    Feed feed = new Feed();
    feed.setFeedId(feedId);
    feedReply.setFeed(feed);
    feedReply.setContent(dto.getContent());
    feedReply.setCreatedDateTime(LocalDateTime.now());
    // feedReplyService.replySave() 호출로 댓글 생성 및 저장
    FeedReply savedReply = feedReplyService.replySave(feedReply);
    // 생성된 댓글 정보를 Dto로 변환하여 반환
    FeedReplyResponseDto feedReplyResponseDto = new FeedReplyResponseDto();
    feedReplyResponseDto.setFeedReplyId(savedReply.getFeedReplyId());
    feedReplyResponseDto.setContent(savedReply.getContent());
    feedReplyResponseDto.setFeedId(savedReply.getFeed().getFeedId());
    feedReplyResponseDto.setMemberId(savedReply.getMember().getMemberId());
    feedReplyResponseDto.setNickname(savedReply.getMember().getNickname());
    feedReplyResponseDto.setCreatedDateTime(savedReply.getCreatedDateTime());
    //로그인이 구현되면 임시로 만들어 놓은것 삭제
    return ResponseEntity.ok(feedReplyResponseDto);
}

    @GetMapping("/{replyId}")
    public ResponseEntity<FeedReplyResponseDto>
    findReply(@PathVariable Long replyId) {
        FeedReplyResponseDto replyResponseDto = feedReplyService.findReply(replyId);
        return ResponseEntity.ok(replyResponseDto);
    }

    @PatchMapping("/{reply-id}")
    public ResponseEntity<FeedReplyResponseDto> updateFeedReply(
            @PathVariable("reply-id") Long replyId,
            @RequestBody FeedReplyRequestDto dto) {
        // 댓글을 찾아옵니다.
        Optional<FeedReply> optionalFeedReply = feedReplyService.findById(replyId);
        if (optionalFeedReply.isPresent()) {
            FeedReply feedReply = optionalFeedReply.get();
            // 새로운 내용으로 댓글을 수정합니다.
            feedReply.setContent(dto.getContent());
            // 수정된 댓글을 저장합니다.
            FeedReply updatedReply = feedReplyService.replySave(feedReply);

            // 수정된 댓글 정보를 Dto로 변환하여 반환합니다.
            FeedReplyResponseDto feedReplyResponseDto = new FeedReplyResponseDto();
            feedReplyResponseDto.setFeedReplyId(updatedReply.getFeedReplyId());
            feedReplyResponseDto.setContent(updatedReply.getContent());
            feedReplyResponseDto.setFeedId(updatedReply.getFeed().getFeedId());
            feedReplyResponseDto.setMemberId(updatedReply.getMember().getMemberId());
            feedReplyResponseDto.setNickname(updatedReply.getMember().getNickname());
            feedReplyResponseDto.setCreatedDateTime(updatedReply.getCreatedDateTime());
            return ResponseEntity.ok(feedReplyResponseDto);
        } else {
            // 댓글이 존재하지 않는 경우 404 Not Found를 반환합니다.
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{replyId}")
    public ResponseEntity<String> deleteFeedReply(@PathVariable Long replyId) {
        // 댓글을 삭제합니다.
        feedReplyService.deleteReply(replyId);

        // 삭제 성공 시 응답
        return ResponseEntity.ok("댓글이 성공적으로 삭제되었습니다.");
    }

    //게시물에 붙어있는 댓글 전체조회 리스트화해서 보여주기

    @GetMapping("/replies")
    public ResponseEntity<List<FeedReplyResponseDto>> getAllReplyForFeed(
            @PathVariable("feed-id") Long feedId,
            @RequestParam int page) {

        int size = 5;
        Page<FeedReply> pageFeedReply = feedReplyService.getAllReplyForFeed(feedId, page - 1, size);

        // 페이징된 결과에서 컨텐츠를 가져옵니다.
        List<FeedReply> replyList = pageFeedReply.getContent();

        // 댓글 목록을 Dto로 변환합니다.
        List<FeedReplyResponseDto> replyDtoList = replyList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        // 댓글 목록을 응답합니다.
        return ResponseEntity.ok(replyDtoList);
    }

    private FeedReplyResponseDto convertToDto(FeedReply reply) {
        return FeedReplyResponseDto.builder()
                .feedReplyId(reply.getFeedReplyId())
                .content(reply.getContent())
                .feedId(reply.getFeed().getFeedId())
                .memberId(reply.getMember().getMemberId())
                .nickname(reply.getMember().getNickname())
                .build();
    }



}
