package com.project.bbibbi.domain.tipReply.service;

import com.project.bbibbi.domain.tipComment.dto.TipCommentDto;
import com.project.bbibbi.domain.tip.repository.TipRepository;
import com.project.bbibbi.domain.tipReply.dto.TipReplyRequestDto;
import com.project.bbibbi.domain.tipReply.dto.TipReplyResponseDto;
import com.project.bbibbi.domain.tipReply.entity.TipReply;
import com.project.bbibbi.domain.tipReply.repository.TipReplyRepository;
import com.project.bbibbi.global.exception.tipexception.TipReplyNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class TipReplyService {

    private final TipReplyRepository tipReplyRepository;

    private final TipRepository tipRepository;

    public TipReply replySave(TipReply tipReply) {
        // 저장 전 로직이 필요한 경우 여기에 추가

        return tipReplyRepository.save(tipReply);
    }

    public TipReplyResponseDto findReply(Long replyId) {
        TipReply reply = tipReplyRepository.findById(replyId)
                .orElseThrow(TipReplyNotFoundException::new);
        return TipReplyResponseDto.builder()
                .tipReplyId(reply.getTipReplyId())
                .content(reply.getContent())
                .tipId(reply.getTip().getTipId())
                .memberId(reply.getMember().getMemberId())
                .nickname(reply.getMember().getNickname())
                .createdDateTime(reply.getCreatedDateTime())
                .comments(reply.getComments().stream().map(tipComment -> TipCommentDto.builder()
                .tipCommentId(tipComment.getTipCommentId())
                .content(tipComment.getContent())
                .memberId(tipComment.getMember().getMemberId())
                .tipReplyId(tipComment.getTipReply().getTipReplyId())
                .parentComment(tipComment.getParentComment())
                .commentOrder(tipComment.getParentComment())
                .nickname(tipComment.getMember().getNickname())
                .tipId(tipComment.getTip().getTipId())
                .build())
                .collect(Collectors.toList()))
                .build();
    }

    public Optional<TipReply> findById(Long replyId) {
        return tipReplyRepository.findById(replyId);
    }

    public TipReply updateReply(Long replyId, TipReplyRequestDto dto) {
        Optional<TipReply> optionalTipReply = tipReplyRepository.findById(replyId);

        if (optionalTipReply.isPresent()) {
            TipReply tipReply = optionalTipReply.get();

            // 새로운 내용으로 댓글을 수정합니다.
            tipReply.setContent(dto.getContent());
            // 수정된 댓글을 저장합니다.
            TipReply updatedReply = tipReplyRepository.save(tipReply);
            return updatedReply;
        } else {
            throw new TipReplyNotFoundException();
        }
    }

    public void deleteReply(Long replyId) {
        TipReply reply = tipReplyRepository.findById(replyId)
                .orElseThrow(TipReplyNotFoundException::new);

        // 댓글을 삭제합니다.
        tipReplyRepository.deleteById(replyId);
    }

    public List<TipReply> getAllReplyForTip(Long tipId) {
        // 특정 팁에 대한 댓글 목록을 조회합니다.
        return tipReplyRepository.findAllByTip_TipId(tipId);
    }
}
