package com.project.bbibbi.domain.tipReply.controller;

import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipComment.dto.TipCommentDto;
import com.project.bbibbi.domain.tipReply.dto.TipReplyRequestDto;
import com.project.bbibbi.domain.tipReply.dto.TipReplyResponseDto;
import com.project.bbibbi.domain.tipReply.entity.TipReply;
import com.project.bbibbi.domain.tipReply.service.TipReplyService;
import com.project.bbibbi.global.exception.tipexception.TipReplyNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tip/{tip-id}/tipreply")
@RequiredArgsConstructor
public class TipReplyController {

    private final static String TIP_REPLY_DEFAULT_URL = "/tipReply";

    private final TipReplyService tipReplyService;
    /* CREATE */
// {reply-id}

    @PostMapping
    public ResponseEntity tipSave(@PathVariable("tip-id") Long tipId,
                                   @RequestBody TipReplyRequestDto dto)
    {//dto -> entity 객체로 변환작업
        TipReply tipReply = new TipReply(); // TipReply 클래스의 기본 생성자 호출
//        tipReply.setMember(Member.builder().memberId(1L).build()); //임시로 memberId 설정
        //로그인한 멤버아이디로 설정
        Long memberId = loginUtils.getLoginId();
        tipReply.setMember(Member.builder().memberId(memberId).build());
        Tip tip = new Tip();
        tip.setTipId(tipId);
        tipReply.setTip(tip);
        tipReply.setContent(dto.getContent());
        tipReply.setCreatedDateTime(LocalDateTime.now());
        // tipReplyService.replySave() 호출로 댓글 생성 및 저장
        TipReply savedReply = tipReplyService.replySave(tipReply);
        // 생성된 댓글 정보를 Dto로 변환하여 반환
        TipReplyResponseDto tipReplyResponseDto = new TipReplyResponseDto();
        tipReplyResponseDto.setTipReplyId(tipReply.getTipReplyId());
        tipReplyResponseDto.setContent(tipReply.getContent());
        tipReplyResponseDto.setNickname(tipReply.getMember().getNickname());
        tipReplyResponseDto.setTipId(tipReply.getTip().getTipId());
        tipReplyResponseDto.setMemberId(tipReply.getMember().getMemberId());
        tipReplyResponseDto.setCreatedDateTime(tipReply.getCreatedDateTime());
        tipReplyResponseDto.setMemberImage(tipReply.getMember().getProfileImg());
        tipReplyResponseDto.setReplyLikeYn(tipReply.getReplyLikeYn());
        //로그인이 구현되면 임시로 만들어 놓은것 삭제
        return ResponseEntity.ok(tipReplyResponseDto);
    }

    @GetMapping("/{reply-id}")
    public ResponseEntity<TipReplyResponseDto> findReply(
            @PathVariable("reply-id") Long replyId) {
        TipReplyResponseDto replyResponseDto = tipReplyService.findReply(replyId);
        return ResponseEntity.ok(replyResponseDto);
    }

    @PatchMapping("/{reply-id}")
    public ResponseEntity<TipReplyResponseDto> updateTipReply(
            @PathVariable("reply-id") Long replyId,
            @RequestBody TipReplyRequestDto dto) {
        // 댓글을 찾아옵니다.
        Optional<TipReply> optionalTipReply = tipReplyService.findById(replyId);
        if (optionalTipReply.isPresent()) {
            TipReply tipReply = optionalTipReply.get();
            // 새로운 내용으로 댓글을 수정합니다.
            tipReply.setContent(dto.getContent());
            tipReply.setModifiedDateTime(LocalDateTime.now());
            // 수정된 댓글을 저장합니다.
            TipReply updatedReply = tipReplyService.replySave(tipReply);

            // 수정된 댓글 정보를 Dto로 변환하여 반환합니다.
            TipReplyResponseDto tipReplyResponseDto = new TipReplyResponseDto();
            tipReplyResponseDto.setTipReplyId(tipReply.getTipReplyId());
            tipReplyResponseDto.setContent(tipReply.getContent());
            tipReplyResponseDto.setNickname(tipReply.getMember().getNickname());
            tipReplyResponseDto.setTipId(tipReply.getTip().getTipId());
            tipReplyResponseDto.setMemberId(tipReply.getMember().getMemberId());
            tipReplyResponseDto.setCreatedDateTime(tipReply.getCreatedDateTime());
            tipReplyResponseDto.setModifiedDateTime(tipReply.getModifiedDateTime());
            tipReplyResponseDto.setMemberImage(tipReply.getMember().getProfileImg());
            tipReplyResponseDto.setReplyLikeYn(tipReply.getReplyLikeYn());
            return ResponseEntity.ok(tipReplyResponseDto);
        } else {
            throw new TipReplyNotFoundException();
        }
    }
    @DeleteMapping("/{reply-id}")
    public ResponseEntity<String> deleteTipReply(
            @PathVariable("reply-id") Long replyId) {
        // 댓글을 삭제합니다.
        tipReplyService.deleteReply(replyId);

        // 삭제 성공 시 응답
        return ResponseEntity.ok("댓글이 성공적으로 삭제되었습니다.");
    }

    //게시물에 붙어있는 댓글 전체조회 리스트화해서 보여주기

    @GetMapping("/replies")
    public ResponseEntity<List<TipReplyResponseDto>> getAllReplyForTip(
            @PathVariable("tip-id") Long tipId,
            @RequestParam int page) {

        int size = 5;
        Page<TipReply> pageFeedReply = tipReplyService.getAllReplyForTip(tipId, page - 1, size);

        // 페이징된 결과에서 컨텐츠를 가져옵니다.
        List<TipReply> replyList = pageFeedReply.getContent();

        // 댓글 목록을 Dto로 변환합니다.
        List<TipReplyResponseDto> replyDtoList = replyList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        // 댓글 목록을 응답합니다.
        return ResponseEntity.ok(replyDtoList);
    }
    private TipReplyResponseDto convertToDto(TipReply reply) {
        return TipReplyResponseDto.builder()
                .tipReplyId(reply.getTipReplyId())
                .content(reply.getContent())
                .nickname(reply.getMember().getNickname())
                .tipId(reply.getTip().getTipId())
                .memberId(reply.getMember().getMemberId())
                .createdDateTime(reply.getCreatedDateTime())
                .modifiedDateTime(reply.getModifiedDateTime())
                .comments(reply.getComments().stream().map(tipComment -> TipCommentDto.builder()
                                .tipCommentId(tipComment.getTipCommentId())
                                .content(tipComment.getContent())
                                .parentComment(tipComment.getParentComment())
                                .commentOrder(tipComment.getParentComment())
                                .nickname(tipComment.getMember().getNickname())
                                .tipId(tipComment.getTip().getTipId())
                                .tipReplyId(tipComment.getTipReply().getTipReplyId())
                                .memberId(tipComment.getMember().getMemberId())
                                .memberImage(tipComment.getMember().getProfileImg())
                                .createdDateTime(tipComment.getCreatedDateTime())
                                .modifiedDateTime(tipComment.getModifiedDateTime())
                                .build())
                        .collect(Collectors.toList()))
                .memberImage(reply.getMember().getProfileImg())
                .replyLikeYn(reply.getReplyLikeYn())
                .build();
    }

}
