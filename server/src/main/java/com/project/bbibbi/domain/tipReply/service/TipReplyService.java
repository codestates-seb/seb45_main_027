package com.project.bbibbi.domain.tipReply.service;

import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import com.project.bbibbi.domain.tipComment.dto.TipCommentDto;
import com.project.bbibbi.domain.tip.repository.TipRepository;
import com.project.bbibbi.domain.tipReply.dto.TipReplyRequestDto;
import com.project.bbibbi.domain.tipReply.dto.TipReplyResponseDto;
import com.project.bbibbi.domain.tipReply.entity.TipReply;
import com.project.bbibbi.domain.tipReply.repository.TipReplyRepository;
import com.project.bbibbi.domain.tipReplyLike.repository.TipReplyLikeRepository;
import com.project.bbibbi.global.exception.tipexception.TipReplyNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class TipReplyService {

    private final TipReplyRepository tipReplyRepository;

    private final TipReplyLikeRepository tipReplyLikeRepository;

    private final MemberRepository memberRepository;

    public TipReply replySave(TipReply tipReply) {
        TipReply insertTipReply = tipReplyRepository.save(tipReply);

        Optional<Member> optionalMember = memberRepository.findById(tipReply.getMember().getMemberId());

        Member member = optionalMember.orElseThrow(() -> {throw new RuntimeException() ; });

        insertTipReply.setMember(Member.builder().memberId
                (tipReply.getMember().getMemberId()).nickname
                (member.getNickname()).profileImg(member.getProfileImg()).build());

        return insertTipReply;
    }

    public TipReplyResponseDto findReply(Long replyId) {
        TipReply reply = tipReplyRepository.findById(replyId)
                .orElseThrow(TipReplyNotFoundException::new);

        Member member = Member.builder().memberId(loginUtils.getLoginId()).build();

        if(member == null){
            reply.setReplyLikeYn(false);
        }
        else {
            int loginUserLikeYn = tipReplyLikeRepository.existCount(reply.getTipReplyId(), member.getMemberId());
            if(loginUserLikeYn == 0)
                reply.setReplyLikeYn(false);
            else reply.setReplyLikeYn(true);
        }

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

    public Optional<TipReply> findById(Long replyId) {
        return tipReplyRepository.findById(replyId);
    }

    public TipReply updateReply(Long replyId, TipReplyRequestDto dto) {
        Optional<TipReply> optionalTipReply = tipReplyRepository.findById(replyId);

        if (optionalTipReply.isPresent()) {
            TipReply tipReply = optionalTipReply.get();

            // 새로운 내용으로 댓글을 수정합니다.
            tipReply.setContent(dto.getContent());
            // replyLikeYn 값을 업데이트합니다.
            tipReply.setReplyLikeYn(dto.getReplyLikeYn());
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

    public Page<TipReply> getAllReplyForTip(Long tipId, int page, int size) {
        // 주어진 페이지와 크기로 Pageable을 생성합니다.
        Pageable pageable = PageRequest.of(page, size);

        // 리포지토리에서 페이지별 결과를 가져옵니다.
        return tipReplyRepository.findAllByTip_TipId(tipId, pageable);
    }
}
