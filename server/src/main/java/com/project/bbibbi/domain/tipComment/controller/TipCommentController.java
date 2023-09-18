package com.project.bbibbi.domain.tipComment.controller;

import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipComment.dto.TipCommentDto;
import com.project.bbibbi.domain.tipComment.entity.TipComment;
import com.project.bbibbi.domain.tipComment.service.TipCommentService;
import com.project.bbibbi.domain.tipReply.entity.TipReply;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.exception.tipexception.TipCommentNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/tip/{tip-id}/tipReply/{reply-id}/tipComment")
public class TipCommentController {

    private static final String TIP_COMMENT_DEFAULT_URL = "/tipComment";

    private final TipCommentService tipCommentService;

    @Autowired
    public TipCommentController(TipCommentService tipCommentService) {
        this.tipCommentService = tipCommentService;
    }

    @PostMapping
    public ResponseEntity<TipCommentDto> createComment(
            @PathVariable("tip-id") Long tipId,
            @PathVariable("reply-id") Long tipReplyId,
            @RequestBody TipCommentDto dto) {
        // 새로운 TipComment 엔티티를 생성하고 값을 설정합니다.
        TipComment tipComment = new TipComment();
        //임의 멤버아이디 1으로 설정
//        tipComment.setMember(Member.builder().memberId(1L).build());
        //로그인한 멤버아이디로 설정
        Long memberId = loginUtils.getLoginId();
        tipComment.setMember(Member.builder().memberId(memberId).build());
        //tipId와 tipReplyId 가져오는 설정
        Tip tip = new Tip();
        tip.setTipId(tipId);
        tipComment. setTip(tip);
        System.out.println("tipComment.tip.tipId ////////" + tipComment.getTip().getTipId());
        tipComment.setTipReply(TipReply.builder().tipReplyId(tipReplyId).build());
        System.out.println("tipComment.tipReply //////////" + tipComment.getTipReply().getTipReplyId());
        tipComment.setContent(dto.getContent());
        tipComment.setParentComment(dto.getParentComment());
        // 나머지 필드도 필요한 대로 설정합니다.
        // 저장 로직
        TipComment savedComment = tipCommentService.saveComment(tipComment);
        // 저장된 엔티티를 DTO로 변환하여 응답합니다.

        TipCommentDto responseDto = TipCommentDto.toDto(savedComment);
        return ResponseEntity.ok(responseDto);
    }

//    @PostMapping("/TipComment/{parentCommentId}")
//    public ResponseEntity<TipCommentDto> createComment(
//            @PathVariable Long parentCommentId,
//            @RequestBody TipCommentDto dto) {
//        TipComment tipComment = tipCommentService.addComment(parentCommentId, dto);
//        return ResponseEntity.ok(convertToDto(tipComment));
//    }

    @GetMapping("/{comment-id}")
    public ResponseEntity<TipCommentDto> findComment(@PathVariable("comment-id") Long commentId) {
        Optional<TipComment> optionalTipComment = tipCommentService.findById(commentId);
        if (optionalTipComment.isPresent()) {
            TipComment tipComment = optionalTipComment.get();
            return ResponseEntity.ok(convertToDto(tipComment));
        } else {
            throw new TipCommentNotFoundException();
        }
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity<TipCommentDto> updateComment(
            @PathVariable("comment-id") Long commentId,
            @RequestBody TipCommentDto dto) {
        Optional<TipComment> optionalTipComment = tipCommentService.findById(commentId);
        if (optionalTipComment.isPresent()) {
            TipComment tipComment = optionalTipComment.get();
            tipCommentService.updateComment(commentId, dto);
            return ResponseEntity.ok(convertToDto(tipComment));
        } else {
            throw new TipCommentNotFoundException();
        }
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity<String> deleteComment(@PathVariable("comment-id") Long commentId) {
        tipCommentService.deleteComment(commentId);
        return ResponseEntity.ok("답글이 성공적으로 삭제되었습니다.");
    }

    private TipCommentDto convertToDto(TipComment tipComment) {
        return TipCommentDto.builder()
                .tipCommentId(tipComment.getTipCommentId())
                .content(tipComment.getContent())
                .memberId(tipComment.getMember().getMemberId())
                .build();
    }
}
