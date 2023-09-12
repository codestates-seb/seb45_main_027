package com.project.bbibbi.domain.tipReply.controller;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipReply.dto.TipReplyRequestDto;
import com.project.bbibbi.domain.tipReply.dto.TipReplyResponseDto;
import com.project.bbibbi.domain.tipReply.entity.TipReply;
import com.project.bbibbi.domain.tipReply.service.TipReplyService;
import lombok.RequiredArgsConstructor;
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
    private final TipReplyService tipReplyService;
    /* CREATE */
// {reply-id}

    @PostMapping
    public ResponseEntity tipSave(@PathVariable ("tip-id")Long tipId,
                                   @RequestBody TipReplyRequestDto dto)
    {//dto -> entity 객체로 변환작업
        TipReply tipReply = new TipReply(); // TipReply 클래스의 기본 생성자 호출
        tipReply.setMember(Member.builder().memberId(1L).build()); //임시로 memberId 설정
        Tip tip = new Tip();
        tip.setTipId(tipId);
        tipReply.setTip(tip);
        tipReply.setContent(dto.getContent());
        tipReply.setCreatedDateTime(LocalDateTime.now());
        // tipReplyService.replySave() 호출로 댓글 생성 및 저장
        TipReply savedReply = tipReplyService.replySave(tipReply);
        // 생성된 댓글 정보를 Dto로 변환하여 반환
        TipReplyResponseDto tipReplyResponseDto = new TipReplyResponseDto();
        tipReplyResponseDto.setTipReplyId(savedReply.getTipReplyId());
        tipReplyResponseDto.setContent(savedReply.getContent());
        tipReplyResponseDto.setTipId(savedReply.getTip().getTipId());
        tipReplyResponseDto.setMemberId(savedReply.getMember().getMemberId());
        tipReplyResponseDto.setNickname(savedReply.getMember().getNickname());
        tipReplyResponseDto.setCreatedDateTime(savedReply.getCreatedDateTime());
        //로그인이 구현되면 임시로 만들어 놓은것 삭제
        return ResponseEntity.ok(tipReplyResponseDto);
    }

    @GetMapping("/{replyId}")
    public ResponseEntity<TipReplyResponseDto>
    findReply(@PathVariable("replyId") Long replyId) {
        TipReplyResponseDto replyResponseDto = tipReplyService.findReply(replyId);
        return ResponseEntity.ok(replyResponseDto);
    }

    @PatchMapping("/{reply-id}")
    public ResponseEntity<TipReplyResponseDto> updateTipReply(
            @PathVariable("tip-id") Long tipId,
            @PathVariable("reply-id") Long replyId,
            @RequestBody TipReplyRequestDto dto) {
        // 댓글을 찾아옵니다.
        Optional<TipReply> optionalTipReply = tipReplyService.findById(replyId);
        if (optionalTipReply.isPresent()) {
            TipReply tipReply = optionalTipReply.get();
            // 새로운 내용으로 댓글을 수정합니다.
            tipReply.setContent(dto.getContent());
            // 수정된 댓글을 저장합니다.
            TipReply updatedReply = tipReplyService.replySave(tipReply);

            // 수정된 댓글 정보를 Dto로 변환하여 반환합니다.
            TipReplyResponseDto tipReplyResponseDto = new TipReplyResponseDto();
            tipReplyResponseDto.setTipReplyId(updatedReply.getTipReplyId());
            tipReplyResponseDto.setContent(updatedReply.getContent());
            tipReplyResponseDto.setTipId(updatedReply.getTip().getTipId());
            tipReplyResponseDto.setMemberId(updatedReply.getMember().getMemberId());
            tipReplyResponseDto.setNickname(updatedReply.getMember().getNickname());
            tipReplyResponseDto.setCreatedDateTime(updatedReply.getCreatedDateTime());
            return ResponseEntity.ok(tipReplyResponseDto);
        } else {
            // 댓글이 존재하지 않는 경우 404 Not Found를 반환합니다.
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{replyId}")
    public ResponseEntity<String> deleteTipReply(
            @PathVariable("tip-id") Long tipId,
            @PathVariable("replyId") Long replyId) {
        // 댓글을 삭제합니다.
        tipReplyService.deleteReply(replyId);

        // 삭제 성공 시 응답
        return ResponseEntity.ok("댓글이 성공적으로 삭제되었습니다.");
    }

    //게시물에 붙어있는 댓글 전체조회 리스트화해서 보여주기

    @GetMapping("/replies")
    public ResponseEntity<List<TipReplyResponseDto>> getAllReplyForTip(@PathVariable("tip-id") Long tipId) {
        // 특정 게시물에 붙어있는 댓글 목록을 조회합니다.
        List<TipReply> replyList = tipReplyService.getAllReplyForTip(tipId);

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
                .tipId(reply.getTip().getTipId())
                .memberId(reply.getMember().getMemberId())
                .nickname(reply.getMember().getNickname())
                .build();
    }

}
